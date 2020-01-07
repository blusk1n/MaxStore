const router = module.exports = require('express').Router()
const User = require('../model/user.js')

router.get('/', function(req, res){
    res.json({"masd":"asda"})
})

router.get('/:id', function(req, res){
    //fitch user fron Db
    
})
router.post('/', function(req, res){
    if (error) {
        return res.status(400).send(error.details[0].message)
    }
    else{
        var name = req.body.name; 
        var email =req.body.email; 
        var pass = req.body.password; 
        var phone =req.body.phone; 
    
        var data = { 
            "name": name, 
            "email":email, 
            "password":pass, 
            "phone":phone 
        }
        User.create(userData, function (err, user) {
            if (err) {
              return next(err)
            } else {
              return res.status(400).send(error.details[0].message)
            }
          }); 
    }
})

router.patch('/', function(req, res){
    res.json({"masd":"asda"})
})


