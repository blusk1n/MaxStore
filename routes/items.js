const router = module.exports = require('express').Router()
const Item = require('../model/item.js')


router.get('/', function (req, res) {
    res.json({ "masd": "asda" })
})

router.post('/', function (req, res) {

    var data = {
        "name": req.body.name,
        "description": req.body.description,
        "photo": req.body.photo,
        "price": req.body.price,
        "available": req.body.available,
        "quantity": req.body.quantity,
        "deactivated": req.body.deactivated,
        "category": req.body.category
    }

    Item.create(data, function (err, items) {
        if (err) {
            return res.send(err)
        } else {
            return res.send(items)
        }
    });
    res.status(200)
})

router.patch('/', function (req, res) {
    res.json({ "masd": "asda" })
})