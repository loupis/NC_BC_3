var express = require('express');
var bodyParser = require('body-parser');
//var methodOverride = require('method-override');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//app.use(methodOverride())

app.set('views', __dirname + '/app/views')
app.set('view engine', 'pug')

var db = require('./config/database.config.js');

require('./config/mymongodb')

var swaggerUi = require('swagger-ui-express');
var swaggerDocument = require('./swagger.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', function (req, res) { res.json({ title : 'NC_BC_3' }) })

require('./app/routes/account.routes.js')(app);

app.use((req, res, next) => {
    console.log(req.method);
    console.log(req.path);
    next();
});

app.use(function(req, res, next) {
    var err = new Error('Not Found');

    err.status = 404;
    next(err);
});

app.use(function(err, req, res) {
    res.status(err.status || 500);
    res.send('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
