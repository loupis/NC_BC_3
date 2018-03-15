var express = require('express');

var app = express();

app.get('/', function (req, res) { res.json({ title : 'NC_BC_3' }) })

module.exports = app;
