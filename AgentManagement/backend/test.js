var chai = require('chai');
var chaiHttp = require('chai-http');
var should = require('chai').should();
chai.use(chaiHttp);
var assert = require('assert');
var expect = chai.expect;
var testInput_name = "Mocha";
var testInput_email = "mocha.testemail@gmail.com";
var testInput_password = "test";

describe('Agent management functinalities', function(){
 
    it("Test Case 1 - Agent Sign in post method.", (done) => {
        chai.request('http://localhost:3001')
        .post(`/agentLogin`)
        .send({emailId: "agent1@email.com",password : "12345"})
        .end((err, res) => {
            expect(err).to.be.null;
            res.body.should.be.a('object');
            res.status.should.be.equal(200);
            
        done();
        });
    })
      it("Test Case 2 - Agent update post method.", (done) => {
        chai.request('http://localhost:3001')
        .post(`/updateProfile`)
        .send({phoneNumber: '123456789', password: '12345', agentID: '5fb9d0d9493fdbfbb46fa977', organisationID:'5fb39cdde99e383d5bcccc65'})
        .end((err, res) => {
            expect(err).to.be.null;
            res.body.should.be.a('object');
            res.status.should.be.equal(200);
        done();
        });
    })
    it("Test Case 3 - Agent get cases method.", (done) => {
        chai.request('http://localhost:3001')
        .get(`/getCases`)
        .send({agentID: '5fb9d0d9493fdbfbb46fa977', organisationID:'5fb39cdde99e383d5bcccc65'})
        .end((err, res) => {
            expect(err).to.be.null;
            res.body.should.be.a('object');
            res.status.should.be.equal(200);
        done();
        });
    })
    it("Test Case 4 - Agent get profile method.", (done) => {
        chai.request('http://localhost:3001')
        .put(`/getProfile`)
        .send({agentID: '5fb9d0d9493fdbfbb46fa977', organisationID:'5fb39cdde99e383d5bcccc65'})
        .end((err, res) => {
            expect(err).to.be.null;
            res.body.should.be.a('object');
            res.status.should.be.equal(200);
        done();
        });
    })
    
    it("Test Case 5 - Agent add comment method", (done) => {
        chai.request('http://localhost:3001')
        .post(`/agentAddMessage`)
        .send({message:'Message from test case', caseId:'4535', userType: 'agent', userId: '89',userName:'John', caseStatus:'Resolved'})
        .end((err, res) => {
            expect(err).to.be.null;
            res.body.should.be.a('object');
            res.status.should.be.equal(200);
        done();
        });
    })
   
    it("Test Case 6 - get case history", (done) => {
        chai.request('http://localhost:3001')
        .get(`/history/:89/:4535`)
        .send()
        .end((err, res) => {
            expect(err).to.be.null;
            res.status.should.be.equal(200);
        done();
        });
    })

})
   

