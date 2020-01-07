const mongoose = require('mongoose');
const Schema = mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    firstname: {
        type: String,
        required: true
    },
    middlename: String,
    lastName: {
        type: String,
        required: true
    },
    gender: String,
    mobilenumber: {
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
    address: String,
    photo: String,
    description: String,
    birthdate: {
        type: Date,
        required: true
    },
    deactivated: {
        type: Boolean,
        default: false
    }
});

module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
  }
  
  module.exports.getUserByUsername = function(username, callback){
    const query = {username: username}
    User.findOne(query, callback);
  }
  
module.exports = mongoose.model('user', Schema)