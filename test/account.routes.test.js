'use strict';

var app = require('../app');
var Account = require('../app/models/account.model')
var chai = require('chai');
var request = require('supertest');

var expect = chai.expect;

describe('Test of all routings for accounts', function() {	

    beforeEach((done) => { 
        Account.remove({}, (err) => { 
           done();         
        });     
    });
    describe('#POST /account/create ', function() {    
      it('should create an account', function(done) {
        request(app)
        .get('/account/create')
        .end(function(err, res) {
          expect(res.statusCode).to.equal(201);
          done();  
        });
      });
    });
    describe('#GET /account/:id ', function() {    
      it('should get a created account', function(done) {
        var account = new Account( { email: 'anna@nc.se' } );  
        account.save(function(err, savedAccount) {
          request(app)
          .get('/account/' + savedAccount._id)
          .end(function(err, res) {
            expect(res.statusCode).to.equal(200);
            done();  
          });
        });
      });
    });
    describe('#POST /account/:id/update ', function() {    
      it('should update an account', function(done) {
        var account = new Account( { email: 'soren@nc.se' } );  
        account.save(function(err, savedAccount) {
          request(app)
          .post('/account/' + savedAccount._id + '/update')
          .send(new Account({email : 'bjorn@nc.se'}))
          .end(function(err, res) {
            expect(res.statusCode).to.equal(201);
            done();  
          });
        }); 
      });  
    });
    describe('#POST /account/:id/delete ', function() {    
      it('should delete an account', function(done) {
        var account = new Account( { email: 'erik@nc.se' } );  
        account.save(function(err, savedAccount) {
          request(app)
          .get('/account/' + savedAccount._id + '/delete')
          .end(function(err, res) {
            expect(res.statusCode).to.equal(201);
            done();  
          });
        }); 
      });  
    });
});