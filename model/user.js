// here we are requiring the mongoose and saving into a constant called mongoose
const mongoose = require('mongoose');

// this schema is for the user
const Schema = mongoose.Schema({
    username: {
        type: String,
        unique: true
         
    },
    firstname: {
        type: String
        
    },
    lastname: {
        type: String
        
    },
    gender: String,
    phone: {
        type: Number,
        unique:true
    },
    email: {
        type: String
        
    },
    password: {
        type: String
        
    },
    address: String,
    photo: String,
    bio: String,
    birthdate: {
        type: Date
        
    },
    deactivated: {
        type: Boolean,
        default: false
    }
});

// here we are exporting the model
module.exports = mongoose.model('user', Schema)