var dataBaseUrl;

//dataBaseUrl = 'mongodb://localhost:27017/nc';
dataBaseUrl = process.env.MONGODB_URI || 'mongodb://nc:NaturalCyclesIsAGreatPlaceToWork@ds215739.mlab.com:15739/nc_bc_3_db';
module.exports = { url : dataBaseUrl }
