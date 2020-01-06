const mongoose = require('mongoose');
const Schema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    middleName: String,
    lastName: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    mobileNumber: {
        type: Number,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    products: String
});
module.exports = mongoose.model('user', Schema)