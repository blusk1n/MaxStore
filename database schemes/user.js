var mongoose = require('mongoose');
var User = mongoose.Schema;

var user = module.exports = new User({
    firstName: String,
    lastName: String,
    age: Number,
    gender: String,
    mobileNumber: Number,
    email: String,
    password: String,
    birthday: Number,
    products: String
});