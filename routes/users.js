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
const upload = require("../upload.js")


router.get('/', function (req, res) {
    res.json({ "masd": "asda" })
})



//add user
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

router.post("/:id/uploadImage" , passport.authenticate("jwt" , {session:false}) , upload.single("photo"), (req,res)=>{
    User.findByIdAndUpdate(req.user._id , {$set : {photo : req.file.filename }} , (err, updated)=>{

        res.json({success : true})
    })
} )

//add folowers
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

//find folowers
router.get('/:id/followers', passport.authenticate("jwt" , {session:false}), function(req, res) {
    Follow.find({followed: ObjectId(req.params.id)}).populate("follower").exec(function(err, data) {
        if (err) res.json({success: false, err})
        else res.json( data)
    })
})

//find following
router.get('/:id/followings', passport.authenticate("jwt" , {session:false}), function(req, res) {
    Follow.find({follower: ObjectId(req.params.id)}).populate("followed").exec(function(err, data) {
        if (err) res.json({success: false, err})
        else res.json( data)
    })
})



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

router.get('/:id', function (req, res) {
    //fitch user fron Dbrgh
   User.findById(req.params.id, function(err, user) {
       if(err){
         res.json({err})
       }else{
          res.json({user})
       }

   })
    
})

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
router.patch('/:id/toggle', function (req, res) {

    User.findByIdAndUpdate(req.params.id, { $set: req.body.deactivated }, function (err, items) {
        if (err) {
            return res.send(err)
        } else {
            return res.send(items)
        }
    });
})


// Get all user's items 

router.get('/:id/items', (req, res) => {
    // console.log(req.params.id)
    // res.send(req.params.id)
    Items.find({ user: req.params.id }, (err, items) => {
        if (err) res.send({ message: err })
        res.send(items)
    })
})