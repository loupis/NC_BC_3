'use strict';

module.exports = function(app) {

    var accounts = require('../controllers/account.controller.js');

    app.get('/', accounts.home);

    app.post('/accounts', accounts.create);

    app.get('/accounts', accounts.findAll);

    app.get('/', accounts.findAll);

    //app.get('/accounts/:id', accounts.findOne);

    app.put('/accounts/:id', accounts.update);

    app.get('/accounts/:id/update', accounts.update);

    app.get('/accounts/:id/updateAccountForm', accounts.updateAccountForm);

    app.get('/accounts/:id', accounts.accountDetail);

    app.get('/accounts/:id/delete', accounts.delete);

}

