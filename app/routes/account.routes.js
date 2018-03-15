'use strict';

module.exports = function(app) {

    var accounts = require('../controllers/account.controller.js');

    app.post('/accounts', accounts.create);

    app.get('/accounts', accounts.findAll);

    app.get('/accounts/:id', accounts.findOne);

    app.put('/accounts/:id', accounts.update);

    app.delete('/accounts/:id', accounts.delete);

}

