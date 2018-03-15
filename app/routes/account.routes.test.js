'use strict';

var app = require('../../app');
var Account = require('../models/account.model')
var chai = require('chai');
var request = require('supertest');

var expect = chai.expect;

describe('Test of all routings for accounts', function() {	

     describe('#GET / accounts', function() { 
        it('should get all accounts', function(done) { 
          request(app) .get('/accounts')
            .end(function(err, res) { 
              expect(res.statusCode).to.equal(200); 
              expect(res.body).to.be.an('array'); 
              expect(res.body).to.be.empty; 
              done(); 
            }); 
        });
    });

    var account = new Account( { email: 'anna@nc.se' } ); 

    describe('## Create an account ', function() { 
        it('should create an account', function(done) { 
            request(app) .post('/accounts') .send(account) .end(function(err, res) { 
                expect(res.statusCode).to.equal(200); 
                expect(res.body.email).to.equal('anna@nc.se'); 
                account = res.body; 
                done(); 
            }); 
        }); 
    }); 

    describe('Get an account by id', function() {
        it('should get a account', function(done) {
          request(app)
            .get('/accounts/' + account._id)
            .end(function(err, res) {
              expect(res.statusCode).to.equal(200);
              expect(res.body.email).to.equal('anna@nc.se');
              done();
            });
        });
      });

      describe('Update an account by id', function() {
        it('should modify an account', function(done) {
          account.email = 'micke@nc.se'
          request(app)
            .put('/accounts/' + account._id)
            .send(account)
            .end(function(err, res) {
              expect(res.statusCode).to.equal(201);
              expect(res.body.email).to.equal('micke@nc.se');
              done();
            });
        });
      });
      describe('Delete an account by id', function() {
        it('should delete an account', function(done) {
          request(app)
            .delete('/accounts/' + account._id)
            .end(function(err, res) {
              expect(res.statusCode).to.equal(201);
              done();
            });
        });
    });
});
