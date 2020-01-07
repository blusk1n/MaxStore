const mongoose = require('mongoose');
const Schema = mongoose.Schema({
    stars: {
        type: Number,
        min: 1,
        max: 5
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'item'
    }
});

module.exports = mongoose.model('rate', Schema)