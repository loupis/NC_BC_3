'use strict';


//var uniqueValidator = require('uniqueValidator');
var Account = require('../models/account.model.js');

//Account.schema.plugin(uniqueValidator);

exports.create = function(req, res) {
    
    if(!req.body.email) { 
        return res.status(400).send({message: "Account can not be empty"}); 
    }

    var account = new Account({email: req.body.email});
    
    account.save(function(err, data) {
        if(err) {
            console.log(err);
            res.status(500).send({message: "Some error occurred while creating the Account."});
        } else {
            //res.render('statusAccount', { status : 'created', account : account });
            return res.status(201).send(account);
        }
    });

};

exports.findAll = function(req, res) {
    Account.find(function(err, accounts){
        if(err) {
            res.status(500).send({message: "Some error occurred while retrieving accounts."});
        } else {
            //res.render('accounts', { title : 'Accounts', accounts : accounts });
            res.status(200).send(accounts);
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
            return res.status(404).send({message: "Account not found with id " + req.params.id});            
        }
        //res.render('statusAccount', { status : 'found', account : account});  
        res.status(200).send(account);
    });
};

exports.update = function(req, res) {
   	Account.findById(req.params.id, function(err, account) {
		if(err) {
		    console.log(err);
		    if(err.kind === 'ObjectId') {
		        return res.status(404).send({message: "Account not found with id " + req.params.id});                
		    }
		    return res.status(500).send({message: "Error retrieving account with id " + req.params.id});
		}

		if(!account) { return res.status(404).send({message: "Account not found with id " + req.params.id}); }

		account.email = req.body.email;

		account.save(function(err, account){
		    if(err) {
		        res.status(500).send({message: "Could not update account with id " + req.params.id});
		    } else {
		        //res.render('statusAccount', { status : 'updated', account : account});  
                return res.status(201).send(account);
            }
		});
  	});
};

exports.delete = function(req, res) {
    Account.findByIdAndRemove(req.params.id, function(err, account) {

        if(err) {
            console.log(err);
            if(err.kind === 'ObjectId') {
                return res.status(404).send({message: "Account not found with id " + req.params.id});                
            }
            return res.status(500).send({message: "Could not delete account with id " + req.params.id});
        }
        if(!account) { return res.status(404).send({message: "Account not found with id " + req.params.id}); }

        //es.status(201).render('statusAccount', { status : 'deleted', account : account});
        return res.status(201).send(account);
    });

};


