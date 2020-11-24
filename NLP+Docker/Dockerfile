#pip install tensorflow
#pip install "tensorflow_hub>=0.6.0"
#pip3 install tensorflow_text

#pip3 install --quiet seaborn

FROM python:3.8

#FROM python:alpine3.8 

# EXPOSE 5000

# #RUN mkdir /app

# #ADD . /app/ 



# COPY . /NLP+Docker

# WORKDIR /NLP+Docker 

# RUN pip install --upgrade pip
# #RUN sudo apt install python3-dev python3-pip
# RUN pip install tensorflow
# RUN pip install "tensorflow_hub>=0.6.0"
# RUN pip3 install tensorflow_text
# RUN pip3 install --quiet seaborn
# #RUN pip install pipenv
# RUN pip install flask==1.1.1
# ENTRYPOINT [ "python" ] 
# #RUN env FLASK_APP=app.py flask run

# CMD ["env FLASK_APP=app.py flask run"]


#FROM python:3.8-alpine
WORKDIR /NLP+Docker 
COPY . .

ENV FLASK_APP=app.py
ENV FLASK_RUN_HOST=0.0.0.0
#RUN apk add --no-cache gcc musl-dev linux-headers
RUN pip install --upgrade pip
RUN pip install flask==1.1.1
RUN pip install tensorflow
RUN pip install "tensorflow_hub>=0.6.0"
RUN pip3 install tensorflow_text
RUN pip3 install --quiet seaborn
EXPOSE 5000

CMD ["flask", "run"]
