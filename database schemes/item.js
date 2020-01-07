var mongoose = require('mongoose');
var Item = mongoose.Schema;
var user = require('user');

var item = module.exports = new Item({
    name: String,
    description: Number,
    date: Date,
    retailer: ObjectId(user.id),
    price: Number
});