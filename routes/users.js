const router = module.exports = require('express').Router()
const User = require('../model/user.js')
const jwt = require('jsonwebtoken');
const passport = require('passport');

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


router.post('/authenticate', (req, res, next) => {
    const username = req.body.username
    const password = req.body.password
    User.getUserByUsername(username, (err, user) => {
        if(err) throw err
        if(!user) {
            return res.json({success: false, msg: 'User not found'})
        }
        
        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                const token = jwt.sign(user, config.secret, {
                    rexpiresIn: 604800 // 1week
                })
                res.json({
                    success: true,
                    token: 'JWT' + token,
                    user: {
                        id: user._id,
                        name: user.username,
                        email: user.email
                    }
                })
            } else {
                return res.json({success: false, msg: 'Wrong password'})
            }
        })
    })
})