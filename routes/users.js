const router = module.exports = require('express').Router()
const User = require('../model/user.js')
const Follow = require('../model/following.js')
const jwt = require('jsonwebtoken');
const passport = require('passport');
const Item = require("../model/item.js")
const config = require('../config/database')
const ObjectId = require('mongodb').ObjectID
const bcrypt = require('bcryptjs');
const Items = require('../model/item')
const express = require('express')
const app = express()



router.get('/', function (req, res) {
    res.json({ "masd": "asda" })
})


/**
 * @param post handel add user.
 */
router.post('/', (req, res) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) res.json({ err })
        else {
            req.body.password = hash
            User.create(req.body, (err, created) => {
                if (err) return res.json({ err })
                created.password = undefined
                res.json({ created })
            })

        }
    })

})

/**
 * @param get handel add folowers to a user.
 */
router.get('/:id/follow', passport.authenticate("jwt", { session: false }), function (req, res) {
    var data = {
        follower: req.user._id,
        followed: req.params.id
    }
    Follow.findOne(data, (err,found)=>{
        if(!found){

            Follow.create(data, function(err, user) {
                if (err) res.json({success: false, err})
                else res.json({success:true})
                
            })
        }else {
            Follow.remove(data ,function(err, user) {
                if (err) res.json({success: false, err})
                else res.json({success:true})
                
            })
        }
    })
})

/**
 * @param get handel find folowers of a user.
 */
router.get('/:id/followers', passport.authenticate("jwt" , {session:false}), function(req, res) {
    Follow.find({followed: ObjectId(req.params.id)}).populate("follower").exec(function(err, data) {
        if (err) res.json({success: false, err})
        else res.json( data)
    })
})

/**
 * @param get handel find whom following a user.
 */
router.get('/:id/followings', passport.authenticate("jwt" , {session:false}), function(req, res) {
    Follow.find({follower: ObjectId(req.params.id)}).populate("followed").exec(function(err, data) {
        if (err) res.json({success: false, err})
        else res.json( data)
    })
})


/**
 * @param get handel update a user info.
 */
router.patch('/:id', (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, { new: true }, function (err, user) {
        if (err) {
            res.send({ success: false, err })
        } else {
            if (!user) {
                res.send({ success: false, message: 'Not found' })
            } else {
                res.send(user)
            }
        }



    })
})


/**
 * @param post handel user authentication.
 */
router.post('/authenticate', (req, res, next) => {
    const username = req.body.username
    const password = req.body.password
    User.findOne({ username }, (err, user) => {
        if (err) throw err
        if (!user) {
            return res.json({ success: false, msg: 'User not found' })
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
                return res.json({ success: false, msg: 'Wrong password' })
            }
        })

    })
})
/**
 * @param get handel find a user.
 */
router.get('/:id', function (req, res) {
   User.findById(req.params.id, function(err, user) {
       if(err){
         res.json({err})
       }else{
          res.json({user})
       }

   })
    
})
/**
 * @param get handel find all items of a user.
 */
router.get('/:username/items', passport.authenticate("jwt" , {session:false}) , function(req, res){
    if(req.user.username == req.params.username){
        Item.find({user : req.user._id}).sort({_id : -1}).exec((err,products)=>{
            if (err) res.json({err})
            else res.json({products,user : req.user})
        })

    }else{
        User.findOne({username : req.params.username}).lean().exec((err,user)=>{
            Follow.exists({followed : user._id, follower : req.user._id}, (err,exist)=>{
                user.followed = exist
                user.password = undefined
                Item.find({user : user._id}).sort({_id : -1}).exec((err,products)=>{
                    if (err) res.json({err})
                    else res.json({products,user})
                })
            })
        })

    }
})
/**
 * @param get handel delete user in a way it will update the deactivation property so the user 
 * account will be deactivated but not completely deleted from DB
 */
router.patch('/:id/toggle', function (req, res) {

    User.findByIdAndUpdate(req.params.id, { $set: req.body.deactivated }, function (err, items) {
        if (err) {
            return res.send(err)
        } else {
            return res.send(items)
        }
    });
})


/**
 * @param get handel find all items of a user in different way.
 */
router.get('/:id/items', (req, res) => {
    Items.find({ user: req.params.id }, (err, items) => {
        if (err) res.send({ message: err })
        res.send(items)
    })
})