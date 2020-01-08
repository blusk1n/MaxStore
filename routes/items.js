const router = module.exports = require('express').Router()
const Item = require('../model/item.js')


router.get('/', function(req, res){
    Item.find({}, function (err, item) {
        res.send(item)
    });
})

router.get('/:id', function(req, res){
    
    Item.find({_id: req.params._id}, function(err, item) {
        res.send(item)
    })
})

router.post('/', function(req, res){
    
    var data = { 
        "name":  req.body.name, 
        "description":req.body.description, 
        "photo":req.body.photo, 
        "price":req.body.price,
        "available":req.body.available,
        "quantity":req.body.quantity, 
        "deactivated":req.body.deactivated, 
        "category":req.body.category
    }

    Item.create(data, function (err, items) {
        if (err) {
            return console.log('err')
        } else {
            return console.log('Done')
        }
        }); 
        res.status(200).send({message: 'done'})
})

router.patch('/', function(req, res){
    res.json({"masd":"asda"})
})