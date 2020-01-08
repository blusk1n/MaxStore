const router = module.exports = require('express').Router()
const Item = require('../model/item.js')
const Rate = require('../model/rate.js')
const Review = require('../model/review.js')

router.patch('/:id', function (req, res) {

    Item.findByIdAndUpdate(req.params.id, { $set: req.body }, function (err, items) {
        if (err) {
            return res.send(err)
        } else {
            return res.send(items)
        }
    });
})

router.post('/:id/reviews', function (req, res) {
    let object = { item: req.params.id, user: req.user._id, content: req.body.content };

    Review.create(object, function (err, items) {
        if (err) {
            return res.send(err)
        } else {
            return res.send(items)
        }
    });
})

router.post('/:id/rates', function (req, res) {
    let object = { item: req.params.id, user: req.user._id, stars: req.body.stars };

    Rate.create(object, function (err, items) {
        if (err) {
            return res.send(err)
        } else {
            return res.send(items)
        }
    });
})

router.get('/:id/rates', function (req, res) {

    Rate.find({ item: req.params.id }, function (err, items) {
        if (err) {
            return res.send(err)
        } else {
            return res.send(items)
        }
    });
})

router.get('/:id/reviews', function (req, res) {

    Review.find({ item: req.params.id }, function (err, items) {
        if (err) {
            return res.send(err)
        } else {
            return res.send(items)
        }
    });
})

