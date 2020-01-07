const mongoose = require('mongoose');

const Schema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required : true
    },
    firstname: {
        type: String,
        required: true
    },
    middlename: String,
    lastname: {
        type: String,
        required: true
    },
    gender: String,
    // mobilenumber: {
    //     type: Number,
    //     unique: true
    // },
    // email: {
    //     type: String,
    //     required: true
    // },
    password: {
        type: String,
        required: true
    },
    address: String,
    photo: String,
    description: String,
    // birthdate: {
    //     type: Date,
    //     required: true
    // },
    deactivated: {
        type: Boolean,
        default: false
    }
});




// module.exports.comparePassword = function(password, hash, callback) {
//     bcrypt.compare(password, hash, (err, isMatch) => {
//         if(err) throw err;
//         callback(null, isMatch);
//     })
// }
  
  
module.exports = mongoose.model('user', Schema)