const router = module.exports = require('express').Router()
const Item = require('../model/item.js')
const mongoose = require('mongoose');

router.patch('/:id', function (req, res) {

    Item.findByIdAndUpdate(req.params.id, { $set: req.body }, function (err, items) {
        console.log(items)
        if (err) {
            return res.send(err)
        } else {
            return res.send(items)
        }
    });
})