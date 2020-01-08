const router = module.exports = require('express').Router()
const Item = require('../model/item.js')


router.get('/', function(req, res ,callback){
        Item.find({}, function(err, items) {
          if(err) {
            callback(err, null);
          } else {
            callback(null, items);
          }
        });
      
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

    Item.create(data, function (err, items, next) {
        if (err) {
            return next(err)
            // callback(err, null);
        } else {
            return res.status(400).send(err)
        }
        }); 
        res.status(200)
})

router.patch('/:id', function(req, res){
    res.json({"masd":"asda"})
})