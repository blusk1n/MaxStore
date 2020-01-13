// here we are requiring the express Router, passport and item, following, rate, review schemas and the upload file.
const router = module.exports = require('express').Router()
const Item = require('../model/item.js')
const Follow = require('../model/following.js')
const Rate = require('../model/rate.js')
const Review = require('../model/review.js')
const passport = require("passport")
const upload = require("../upload.js")

// this is the get route for the API/items for getting the items.
router.get("/" , (req,res)=>{
  Item.find({}).sort({_id : -1}).populate("user").exec((err, items)=>{
    if (err) res.json({err})
    else res.json(items)
  })
})

// this is the get route for the API/items/id for updating an item using the id.
router.patch('/:id', function (req, res) {

    Item.findByIdAndUpdate(req.params.id, { $set: req.body }, function (err, items) {
        if (err) {
            return res.send(err)
        } else {
            return res.send(items)
        }
    });
})

// this is the get route for the API/items for postting the items.
router.post('/', passport.authenticate("jwt" , {session:false}) , upload.single("photo"),  function (req, res) {
    req.body.photo = req.file.filename
    req.body.user = req.user._id
    req.body.available = Boolean(req.body.available)

  Item.create(req.body, function (err, item) {
      if (err) res.json({err})
      else res.json({item})
      
  });
})

// this is the get route for the API/items/home for getting the items in the home page.
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

// this is the get route for the API/items/id/reviews for postting the item's reviews.
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

// this is the get route for the API/items/id/rates for postting the item's rates.
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

// this is the get route for the API/items/id/rates for getting the item's rates.
router.get('/:id/rates', function (req, res) {

    Rate.find({ item: req.params.id }, function (err, items) {
        if (err) {
            return res.send(err)
        } else {
            return res.send(items)
        }
    });
})

// this is the get route for the API/items/id/reviews for getting the item's reviews.
router.get('/:id/reviews', function (req, res) {

    Review.find({ item: req.params.id }, function (err, items) {
        if (err) {
            return res.send(err)
        } else {
            return res.send(items)
        }
    });
})

// this is the get route for the API/items/reviews/id/toggle for updating reviews status.
router.patch('/reviews/:id/toggle', function (req, res) {

    Review.findByIdAndUpdate(req.params.id, { $set: req.body.deactivated }, function (err, items) {
        if (err) {
            return res.send(err)
        } else {
            return res.send(items)
        }
    });
})

// this is the get route for the API/items/rates/id/toggle for updating rates status.
router.patch('/rates/:id/toggle', function (req, res) {

    Rate.findByIdAndUpdate(req.params.id, { $set: req.body.deactivated }, function (err, items) {
        if (err) {
            return res.send(err)
        } else {
            return res.send(items)
        }
    });
})

// this is the get route for the API/items/reviews/id for updating reviews.
router.patch('/reviews/:id', function (req, res) {

    Review.findByIdAndUpdate(req.params.id, { $set: req.body }, function (err, items) {
        if (err) {
            return res.send(err)
        } else {
            return res.send(items)
        }
    });
})

// this is the get route for the API/items/rates/id for updating rates.
router.patch('/rates/:id', function (req, res) {

    Rate.findByIdAndUpdate(req.params.id, { $set: req.body }, function (err, items) {
        if (err) {
            return res.send(err)
        } else {
            return res.send(items)
        }
    });
})

// this is the get route for the API/items/id/toggle for updating item's status.
router.patch('/:id/toggle', function (req, res) {

    Item.findByIdAndUpdate(req.params.id, { $set: req.body.deactivated }, function (err, items) {
        if (err) {
            return res.send(err)
        } else {
            return res.send(items)
        }
    });
})

// this is the get route for the API/items/id for postting the item.
router.post('/:id', (req, res) => {
    const user = req.params.id;
    data = {
        "user": user,
        "description": req.body.description,
        "photo": req.body.photo,
        "price": req.body.price,
        "quantity": req.body.quantity,
        "name": req.body.name


    }
    Item.create(data, (err, created) => {
        if (err) return res.json({err})
        res.json({created})
    })
})

// this is the get route for the API/items/id for getting the item by its id.
router.get("/:id" , (req,res)=>{
    Item.findById(req.params.id).populate("user").exec((err, item)=>{
      if (err) res.json({err})
      else res.json(item)
    })
  })