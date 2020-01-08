const router = module.exports = require('express').Router()
const User = require('../model/user.js')
const jwt = require('jsonwebtoken');
const passport = require('passport');
const config = require('../config/database')
const bcrypt = require('bcryptjs');
router.get('/', function(req, res){
    res.json({"masd":"asda"})
})

router.get('/:id', function(req, res){
    //fitch user fron Db
   User.findById(req.param.id, function(err, user, next) {
       if(err){
           return next(err)
       }else{
           console.log(user)
           res.json(user)
       }

   })
    
})
router.post('/', (req, res) => {
    bcrypt.hash(req.body.password , 10 , (err, hash)=>{
        if (err) res.json({err})
        else{
            req.body.password = hash
            User.create(req.body , (err,created)=> {
                if (err) return res.json({err})
                created.password = undefined
                res.json({created})
            })

        }
    } )
    
})
//add user
router.post('/', function(req, res){
   
        var data = { 
            "username": req.body.username, 
            "firstname":req.body.firstname, 
            "lastname":req.body.lastname, 
            "gender":req.body.gender,
            "phone":req.body.phone, 
            "email":req.body.email, 
            "password":req.body.password,
            "address":req.body.address, 
            "photo":req.body.photo, 
            "bio":req.body.bio, 
            "birthdate":req.body.birthdate,
            "deactivated":req.body.deactivated  
        }

        User.create(data, function (err, user, next) {
            if (err) {
              return next(err)
            } else {
               console.log('im tgere')
            }
          });     
})

router.patch('/', function(req, res){
    res.json({"masd":"asda"})
})




// Authenticate
router.post('/authenticate', (req, res, next) => {
    const username = req.body.username
    const password = req.body.password
    User.findOne({username}, (err, user) => {
        if(err) throw err
        if(!user) {
            return res.json({success: false, msg: 'User not found'})
        }
    bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
            user.password = undefined
            const token = jwt.sign(JSON.stringify(user), config.secret, {
                // expiresIn: 604800 // 1 week
            })
            res.json({
                success: true,
                token: 'JWT ' + token,
                user
            })
        } else {
            return res.json({success: false, msg: 'Wrong password'})
        }
    })
        
    })
})