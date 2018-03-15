var dbConfig = require('./database.config.js');
var mymongodb = require('mongoose');

mymongodb.Promise = global.Promise;

mymongodb.connect(dbConfig.url);

mymongodb.connection.on('error', function() {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
})

mymongodb.connection.once('open', function() {
    console.log("Successfully connected to the database");
})

module.exports = mymongodb;

