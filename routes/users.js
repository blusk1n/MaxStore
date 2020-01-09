const router = module.exports = require('express').Router()
const User = require('../model/user.js')
const Follow = require('../model/following.js')
const jwt = require('jsonwebtoken');
const passport = require('passport');
const config = require('../config/database')
const ObjectId = require('mongodb').ObjectID
const bcrypt = require('bcryptjs');




router.get('/', function(req, res){
    res.json({"masd":"asda"})
})



router.get('/:id', function(req, res){
    //fitch user fron Dbrgh
   User.findById(req.params.id, function(err, user) {
       if(err){
         res.json({err})
         throw err
       }else{
          res.json({user})
       }

   })
    
})
//add user
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
    })
    
})

//add folowers
router.get('/follow', function(req, res) {
    Follow.create(req.body, function(err, user) {
        if (err) res.json({success: false, err})
        else res.json({success:true})
        
    })
})

//find folowers
router.get('/:id/followers', function(req, res) {
    Follow.find({followed: ObjectId(req.params.id)}).populate("follower").exec(function(err, data) {
        if (err) res.json({success: false, err})
        else res.json({success:true, data})
    })
})

//find following
router.get('/:id/followings', function(req, res) {
    Follow.find({follower: ObjectId(req.params.id)}).populate("followed").exec(function(err, data) {
        if (err) res.json({success: false, err})
        else res.json({success:true, data})
    })
})



router.patch('/:id', (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err, user){
        if (err) {
            res.send({success: false, err})
        } else { 
            if(!user) {
                res.send({success: false, message: 'Not found'})
            } else {
                res.send(user)
            }
        }
       
        
        
    })
})



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
            const token = jwt.sign(user.toJSON(), config.secret, {
                expiresIn: 604800 // 1 week
            })
            res.json({
                success: true,
                token: 'jwt ' + token,
                user
            })
        } else {
            return res.json({success: false, msg: 'Wrong password'})
        }
    })
        
    })

})
  
router.patch('/:id/toggle', function (req, res) {

    User.findByIdAndUpdate(req.params.id, { $set: req.body.deactivated }, function (err, items) {
        if (err) {
            return res.send(err)
        } else {
            return res.send(items)
        }
    });
})

