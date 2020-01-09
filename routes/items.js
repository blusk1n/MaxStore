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

router.get('/:id/reviews', function (req, res) {

    Review.find({ item: req.params.id }, function (err, items) {
        if (err) {
            return res.send(err)
        } else {
            return res.send(items)
        }
    });
})

router.patch('/reviews/:id/toggle', function (req, res) {

    Review.findByIdAndUpdate(req.params.id, { $set: req.body.deactivated }, function (err, items) {
        if (err) {
            return res.send(err)
        } else {
            return res.send(items)
        }
    });
})

router.patch('/rates/:id/toggle', function (req, res) {

    Rate.findByIdAndUpdate(req.params.id, { $set: req.body.deactivated }, function (err, items) {
        if (err) {
            return res.send(err)
        } else {
            return res.send(items)
        }
    });
})

router.patch('/reviews/:id', function (req, res) {

    Review.findByIdAndUpdate(req.params.id, { $set: req.body }, function (err, items) {
        if (err) {
            return res.send(err)
        } else {
            return res.send(items)
        }
    });
})

router.patch('/rates/:id', function (req, res) {

    Rate.findByIdAndUpdate(req.params.id, { $set: req.body }, function (err, items) {
        if (err) {
            return res.send(err)
        } else {
            return res.send(items)
        }
    });
})

router.patch('/:id/toggle', function (req, res) {

    Item.findByIdAndUpdate(req.params.id, { $set: req.body.deactivated }, function (err, items) {
        if (err) {
            return res.send(err)
        } else {
            return res.send(items)
        }
    });
})


// POST item 

router.post('/:id', (req, res) => {
    const user = req.params.id;
    data = {
        "user": user,
        "description": req.body.description,
        "photo": req.body.photo,
        "price": req.body.price,
        "quantity": req.body.quantity,
        "name": req.body.name


    }
    Item.create(data, (err, created) => {
        if (err) return res.json({err})
        res.json({created})
    })
})
