const mongoose = require('mongoose');
const Schema = mongoose.Schema({
    content: {
        type: String,
        max: 250
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

module.exports = mongoose.model('review', Schema)