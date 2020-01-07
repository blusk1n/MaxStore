const mongoose = require('mongoose');
const Schema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    price: {
        type: Number,
        required: true
    },
    available: {
        type: Boolean,
        default: true
    },
    quantity: {
        type: Number,
        default: 1
    },
    deactivated: {
        type: Boolean,
        default: false
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
    }
});

module.exports = mongoose.model('item', Schema)