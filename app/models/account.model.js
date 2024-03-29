'use strict';

var mongoose = require('mongoose');

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

var AccountSchema = mongoose.Schema({
    email: {
    	type: String, 
    	required: 'Email address is required',
    	trim: true, 
    	unique: true,
    	validate: [validateEmail, 'Please fill a valid email address'],
    }
}, 
{
    timestamps: true
});

AccountSchema
.virtual('url')
.get(function () {
  return '/account/' + this._id;
});

module.exports = mongoose.model('Account', AccountSchema);
