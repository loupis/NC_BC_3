var express = require('express');

module.exports = function(app) {

	var account_controller = require('../controllers/account.controller.js');

	app.get('/', account_controller.home);

	app.get('/createAccountForm', account_controller.account_create_get);

	app.post('/account/create', account_controller.account_create_post);

	app.get('/account/:id/delete', account_controller.account_delete_post);

	app.get('/account/:id/update', account_controller.account_update_get);

	app.post('/account/:id/update', account_controller.account_update_post);

	app.get('/updateAccountForm', account_controller.account_update_get);

	app.get('/updateAccount/:id', account_controller.account_update_post);

	app.get('/account/:id', account_controller.account_detail);

	app.get('/accounts/', account_controller.account_list);

}