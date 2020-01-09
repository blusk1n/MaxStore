const router = module.exports = require('express').Router()
const Item = require('../model/item.js')
const Follow = require('../model/following.js')
const Rate = require('../model/rate.js')
const Review = require('../model/review.js')
const passport = require("passport")


router.get("/" , (req,res)=>{
  Item.find({}).sort({_id : -1}).populate("user").exec((err, items)=>{
    if (err) res.json({err})
    else res.json(items)
  })
})

router.patch('/:id', function (req, res) {

    Item.findByIdAndUpdate(req.params.id, { $set: req.body }, function (err, items) {
        if (err) {
            return res.send(err)
        } else {
            return res.send(items)
        }
    });
})

router.post('/', passport.authenticate("jwt" , {session:false}),  function (req, res) {

  req.body.user = req.user._id

  Item.create(req.body, function (err, item) {
      if (err) res.json({err})
      else res.json({item})
      
  });
})

router.get("/home" , passport.authenticate("jwt" , {session:false}) , (req,res)=>{
Follow.find({follower : req.user._id}, (err, data)=>{
  data = data.map(one =>{
    return { user : one.followed}
})
  data.push({user : req.user._id})
  Item.find({$or : data}).populate("user").sort({_id:-1}).exec((err, items)=>{
    if (err) throw err
    else res.json(items)
  })
})
})

router.post('/:id/reviews', function (req, res) {
    let object = { item: req.params.id, user: req.user._id, content: req.body.content };

    Review.create(object, function (err, items) {
        if (err) {
            return res.send(err)
        } else {
            return res.send(items)
        }
    });
})

router.post('/:id/rates', function (req, res) {
    let object = { item: req.params.id, user: req.user._id, stars: req.body.stars };

    Rate.create(object, function (err, items) {
        if (err) {
            return res.send(err)
        } else {
            return res.send(items)
        }
    });
})

router.get('/:id/rates', function (req, res) {

    Rate.find({ item: req.params.id }, function (err, items) {
        if (err) {
            return res.send(err)
        } else {
            return res.send(items)
        }
    });
})

router.get('/:id/reviews', function (req, res) {

    Review.find({ item: req.params.id }, function (err, items) {
        if (err) {
            return res.send(err)
        } else {
            return res.send(items)
        }
    });
})

router.get('/:id/reviews', function (req, res) {

    Review.find({ item: req.params.id }, function (err, items) {
        if (err) {
            return res.send(err)
        } else {
            return res.send(items)
        }
    });
})

router.patch('/reviews/:id/toggle', function (req, res) {

    Review.findByIdAndUpdate(req.params.id, { $set: req.body.deactivated }, function (err, items) {
        if (err) {
            return res.send(err)
        } else {
            return res.send(items)
        }
    });
})

router.patch('/rates/:id/toggle', function (req, res) {

    Rate.findByIdAndUpdate(req.params.id, { $set: req.body.deactivated }, function (err, items) {
        if (err) {
            return res.send(err)
        } else {
            return res.send(items)
        }
    });
})

router.patch('/reviews/:id', function (req, res) {

    Review.findByIdAndUpdate(req.params.id, { $set: req.body }, function (err, items) {
        if (err) {
            return res.send(err)
        } else {
            return res.send(items)
        }
    });
})

router.patch('/rates/:id', function (req, res) {

    Rate.findByIdAndUpdate(req.params.id, { $set: req.body }, function (err, items) {
        if (err) {
            return res.send(err)
        } else {
            return res.send(items)
        }
    });
})

router.patch('/:id/toggle', function (req, res) {

    Item.findByIdAndUpdate(req.params.id, { $set: req.body.deactivated }, function (err, items) {
        if (err) {
            return res.send(err)
        } else {
            return res.send(items)
        }
    });
})
