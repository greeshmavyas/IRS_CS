from flask import Flask, escape, request
from itertools import repeat

import pandas
import scipy
import math

import tensorflow as tf
import tensorflow_hub as hub
#import matplotlib.pyplot as plt
import numpy as np
import os
import pandas as pd
import re
import seaborn as sns


module_url = "https://tfhub.dev/google/universal-sentence-encoder/4"

model = hub.load(module_url)
print ("module %s loaded" % module_url)
def embed(input):
    return model(input)

app = Flask(__name__)

@app.route('/', methods=["GET"])
def model_method():
    data = request.json
    print(data)
    #input = "Duplicate credit card charge"
    input = data["case"]
    billing_sent = ["Payment is throwing errors",
        "Transaction got declined, but credit card got charged",
        "Need assistance with billing",
        "Having billing issues.",
        "What is the Commission fee and how much commission is charged?",
        "Please give an example to show the cost calculation.",
        "How does the COD (Cash on Delivery) payment option work?",
        "Why can't I see the COD option on my payment page?",
        "What is COD limit?",
        "I want to know about EMI (credit card) payment option?",
        "How do I make payment using EMI (Credit Card) option?",
        "What is the eligibility criteria to avail EMI option?",
        "Why is sum total of EMI’s more than the order value?",
        "What happens if bank rejects EMI conversion?",
        "Why is the transaction amount not converted into EMI in 7 working days?",
        "What should I do if my payment fails?",
        "What are the modes of payment for purchasing?",
        "Having issues with the payement mode",
        "What is COD (Cash On Delivery)? Are there any additional charges for COD orders?",
        "Are there any hidden costs (sales tax, octroi etc.) on items?",
        "My transaction failed but the money was deducted from my account. What should I do?",
                    "Questions regarding my charges",
                    "Charge related issues",
                "Duplicate charge back"]

    orders_sent = ["Order is not processed, when can I expect it?",
        "My order is showing cancelled, but I haven't cancelled it",
        "My previous orders are not showing up",
        "How do I manage my orders?",
        "Why are some, Prime and Non-prime, items taking longer to ship?",
        "How do I cancel the order, I have placed?",
        "How do I check the status of my order?",
        "How do I cancel my Order?"]

    product_sent = [ "Head set not working, product is damaged",
        "Products are damaged",
        "Do you sell advertising on your site?",
        "Do you screen the reviews from publishers/labels/studios, customers, authors/artists/actors, or other sources used on your site?",
        "How do I fix typographical errors on my product detail pages?",
        "Why are some titles discounted while others are not?",
        "Who decides the price of the products?",
        "Would I get compensation if the customer has replaced the original product with a different item?",
        "Why are there different prices for the same product? Is it legal?",
        "How will I detect fraudulent emails/calls seeking sensitive personal and confidential information?",]

    shipping_sent = ["When can I expect the shipping of the products",
        "Would I get compensation if the goods are damaged or lost in transit?",
        "Who takes care of the delivery of my products?",
        "Is it safe to receive orders during a pandemic?",
        "Is it possible to reduce contact with drivers when they deliver my orders?",
        "Can healthcare or business customers buy supplies to help its workplace?",
        "Who takes care of the delivery of my products?",
        "Where should I self-ship the Returns?",
        "How can I get my order delivered faster?",
        "Can I modify the shipping address of my order after it has been placed?",
        "Why did the pick up of my product fail?",
        "Why is my returned product re-shipped?",
        "Can I modify my delivery address?",
        "Can I open and check the contents of my package before accepting delivery?",
        "Would I get compensation if the goods are damaged or lost in transit?",
        "What's the status of my order and delivery? Can I change the address on my order?",
                    "When can I expect the arrival of the product", "Shipping is very late"]

    returns_refund_sent = [   "I have created a Return request. When will I get the refund?",
        "What is Instant Refunds?",
        "I paid cash on delivery, how would I get the refund?",
        "How long would it take me to receive the refund of the returned product?",
        "Can I still make returns?",
        "How do I create a Return Request?",
        "I have created a Return request. When will the product be picked up?",
        "How do I return multiple products from a single order?",
        "Why has my return request been declined?",
        "If I receive a wrong product, can I get it replaced?"]

    coupons_gift_cards_sent = [  "How can I purchase Gift Card?",
        "I just received a Gift Card. How do I use it?",
        "How do I check the available balance or expiry date on my Gift Card?",
        "What should I do if, I have not received the e-mail that had Gift Card details?",
        "Does Gift Cards expire?",
        "When is the issued Gift Card sent to the recipient?",
        "What can my Gift Card not be used for or to purchase?",
        "How do I cancel a Gift Card?",
        "What exactly does the recipient receive when I send a issued Gift Card?",
        "What can I do to ensure that the Gift Card is delivered to the recipient?",
        "What happens if I need to return something I purchased with my Gift Card?",
        "Who is the issuer of Gift Cards?",
        "How many Gift Cards can be used in one transaction?",
        "How do I apply a coupon on my order?",
        "Why will 'My Cashback' not be available?",
        "How can I access 'My Cashback' balance?",
        "As 'My cashback' is no more a payment option, what will happen to 'My Cashback' balance?",
        "I was given a coupon when you cancelled my last order. How can I use it?",
        "What is discount capping on coupons?",
        "Is there a limit on how many e-Gift Vouchers that can be used per order?"]

    category_map = {
        "Billing" : billing_sent,
        "Orders" : orders_sent,
        "Product" : product_sent,
        "Shipping" : shipping_sent,
        "Returns/Refund" : returns_refund_sent,
        "Coupons/GiftCards" : coupons_gift_cards_sent
    }

    category_scores = {}


    def get_comparision(sent_1, sent_2):
        sentence_1 = []
        sentence_1.extend(repeat(sent_1,len(sent_2)))
        sts_encode1 = tf.nn.l2_normalize(embed(tf.constant(sentence_1)), axis=1)
        sts_encode2 = tf.nn.l2_normalize(embed(tf.constant(sent_2)), axis=1)
        cosine_similarities = tf.reduce_sum(tf.multiply(sts_encode1, sts_encode2), axis=1)
        clip_cosine_similarities = tf.clip_by_value(cosine_similarities, -1.0, 1.0)
        scores = 1.0 - tf.acos(clip_cosine_similarities) / math.pi
        return scores

    def helper(sentence, list_of_sent, category):
        if category in category_scores:
            list_scores = category_scores.get(category)
            list_scores.append(get_comparision(input, list_of_sent))
            category_scores[category] = list_scores
        else:
            category_scores[category] = []
            list_scores = category_scores.get(category)
            list_scores.append(get_comparision(input, list_of_sent))
            category_scores[category] = list_scores
    for i in category_map:
        helper(input, category_map.get(i), i)
        
    #print(category_scores)

    category_match = {}

    max_similarity =0
    category_result = "Other"
    threshold = 0.3
    for i in category_scores:
        for score_list in category_scores.get(i):
            category_match[i] = np.mean(score_list)
            if max_similarity < category_match[i] and  category_match[i] > threshold:
                max_similarity = category_match[i]
                category_result= i 
            elif max_similarity == category_match[i] and i < category_result:
                category_result= i

    print(category_result)
    return category_result


