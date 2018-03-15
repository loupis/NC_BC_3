var express = require('express');

module.exports = function(app) {

app.get('/updateAccountForm', 
    	function(req, res){ res.render('updateAccountForm'); })

app.get('/deleteAccountForm', 
    	function(req, res){ res.render('deleteAccountForm'); })

app.get('/createAccountForm', 
    	function (req, res) { res.render('createAccountForm', { title : 'Create account' }) ; })

app.get('/statusAccount', 
    	function (req, res) { res.render('statusAccount', { title : 'Create account' }) ; })

}