var mongoose = require('mongoose');
var User = mongoose.Schema;

var users = module.exports = new User({
    firstName: String, // String is shorthand for {type: String}
    lastName: String,
    age: Number,
    gender: String,
    mobileNumber: Number,
    email: String,
    password: String,
    birthday: Number,
    products: String
});