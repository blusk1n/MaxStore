const router = module.exports = require('express').Router()
const Item = require('../model/item.js')


router.get('/', function(req, res){
    res.json({"masd":"asda"})
})

router.post('/', function(req, res){
    
    var data = { 
        "name":  req.body.name, 
        "description":req.body.description, 
        "photo":req.body.photo, 
        "user":req.body.user,
        "available":req.body.available,
        "quantity":req.body.quantity, 
        "deactivated":req.body.deactivated, 
        "category":req.body.category
    }

    Item.create(data, function (err, items) {
        if (err) {
            return next(err)
        } else {
            return res.status(400).send(error.details[0].message)
        }
        }); 
})

router.patch('/', function(req, res){
    res.json({"masd":"asda"})
})