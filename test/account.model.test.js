'use strict';

var app = require('../app');
var Account = require('../app/models/account.model')
var chai = require('chai');
var request = require('supertest');

var expect = chai.expect;	

describe('Accounts', function() { 
 	beforeEach((done) => { //Before each test we empty the database
        Account.remove({}, (err) => { 
           done();         
        });     
    });

	describe('Test the account model', function() { 
		var account = new Account({ email : 'gunilla@nc.se'})
		describe('#save()', function() { 
		    it('should save without error', function(done) { 
		      account.save(function(err) {
		      	if(err) done(err);
		      	else done();		
		      }); 
		    });
		});
		describe('#findById()', function() { 
		    it('should find account without error', function(done) { 
		      Account.findById(account._id, function(err) {
		      	if(err) done(err);
		      	else done();		
		      }); 
		    });
		});
		describe('#(findByIdAndRemove)', function() { 
		    it('should delete account without error', function(done) { 
		   	  Account.findByIdAndRemove(account._id, function(err, account) {
		      	if(err) done(err);
		      	else done();		
		      }); 
		    });
		}); 
	});	 
});