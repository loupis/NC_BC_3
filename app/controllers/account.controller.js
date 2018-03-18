'use strict';
var async = require('async');
const { check,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
var debug = require('debug')('account');


//var uniqueValidator = require('uniqueValidator');
var Account = require('../models/account.model.js');

//Account.schema.plugin(uniqueValidator);

exports.home = function (req, res, next) { 
     Account.find(function(err, accounts){
        if(err) {
            var err = Error("Some error occurred while retrieving accounts.");
            err.status = 500;
            return next(err); 
        } else {
            return res.status(200).render('accounts', { title : 'NC_BC_3', accounts : accounts });
        }
    });
};

exports.account_detail = function(req, res, next) {
    Account.findById(req.params.id, function(err, account) {      
        if(err) {
            console.log(err);
            if(err.kind === 'ObjectId') {
                var err = Error("Account not found with id " + req.params.id);
                err.status = 404;
                return next(err);                 
            }
            var err = Error("Error retrieving account with id " + req.params.id);
            err.status = 500;
            return next(err); 
        } 
        if(!account) {
            var err = Error("Account not found with id " + req.params.id);
            err.status = 404;
            return next(err);           
        }
        return res.status(200).render('accountDetail', { title: 'Account detail', account:  account } );
    });
};

exports.account_list = function(req, res,next) {
    Account.find(function(err, accounts){
        if(err) {
            var err = Error("Some error occurred while retrieving accounts.");
            err.status = 500;
            return next(err); 
        } else {
            return res.status(200).render('accounts', { title : 'Accounts list', accounts : accounts });
        }
    });
};

exports.account_create_get = function(req, res) {   
    res.render('createAccountForm', {});       
};

exports.account_create_post =  function(req, res, next) {
    if(!req.body.email) { 
        var err = Error("An account can not be created without an email");
        err.status = 400;
        return next(err); 
    }
    var account = new Account({email: req.body.email});
    account.save(function(err, data) {
        if(err) {
            debug('update error:' + err);
            return next(err);
        } else {
            return res.status(201).render('accountStatus', { status : 'created', account : account });
        }
    });
};

exports.findOne = function(req, res) {
    Account.findById(req.params.id, function(err, account) {
        if(err) {
            console.log(err);
            if(err.kind === 'ObjectId') {
                return res.status(404).send({message: "Account not found with id " + req.params.id});                
            }
            return res.status(500).send({message: "Error retrieving account with id " + req.params.id});
        } 
        if(!account) {
            //return res.status(404).send({message: "Account not found with id " + req.params.id});       
            var err = new Error('Account not found');
            err.status = 404;
            return next(err);     
        }
        res.status(200).render('accountStatus', { status : 'found', account : account});  
    });
};

exports.account_update_get = function(req, res) {
    Account.findById(req.params.id, function(err, account) {
        if(err) {
            console.log(err);
            if(err.kind === 'ObjectId') {
                var err = Error("Account not found with id " + req.params.id);
                err.status = 404;
                return next(err);             
            }
            var err = Error("Error retrieving account with id " + req.params.id);
            err.status = 500;
            return next(err);   
        } 

        if(!account) {
            var err = Error("Account not found with id " + req.params.id);
            err.status = 404;
            return next(err);           
        }
        res.status(200).render('updateAccountForm', { account : account});  
    });
};

exports.account_update_post = function(req, res, next) {
    Account.findById(req.params.id, function(err, account) {
        if(err) {
            console.log(err);
            if(err.kind === 'ObjectId') {
                var err = Error("Account not found with id " + req.body.id);
                err.status = 404;
                return next(err);     
            }
            var err = Error("Error retrieving account with id " + req.body.id);
            err.status = 500;
            return next(err);
        }

        if(!account) { 
            var err = Error("Account not found with id " + req.body.id);
            err.status = 404;
            return next(err);
        }
        account.email = req.body.email;
        account.save(function(err, data) {
            if (err) {
                debug('update error:' + err);
                return next(err);
            }
            res.status(201).render('accountStatus', { status : 'created', account : account });
        });
    });
};

exports.account_delete_post = function(req, res) {
    Account.findByIdAndRemove(req.params.id, function(err, account) {
        if(err) {
            console.log(err);
            if(err.kind === 'ObjectId') {
                var err = Error("Account not found with id " + req.params.id);
                err.status = 404;
                return next(err);            
            }
            var err = Error("Could not delete account with id " + req.params.id);
            err.status = 500;
            return next(err);
        }
        if(!account) { 
            var err = Error("Account not found with id " + req.params.id);
            err.status = 404;
            return next(err);
        }
        return res.status(201).render('accountStatus', { status : 'deleted', account : account});
    });
};