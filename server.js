const express           = require("express"),
      bodyParser        = require("body-parser"),
      mongoose          = require("mongoose"),
      app               = express(),
      users             = require('./routes/users.js'),
      User              = require("./model/user.js"),
      Item              = require("./model/item.js"),
      items             = require('./routes/items.js'),
      Category          = require("./model/category.js"),
      passport          = require('passport'),
      path              = require("path"),
      upload            = require("./upload.js"),
      port              = process.env.PORT || 3000
    
mongoose.connect('mongodb+srv://OMX:the6glcmab@cluster0-mq83j.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true , useUnifiedTopology: true } , ()=>console.log("database is working")) 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true})); 
app.use(express.static(__dirname + "/public"))

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport)


app.use('/api/users', users)
app.use('/api/items', items)
app.get('/api/uploads/:name'  , (req,res)=>{
    res.sendFile(path.resolve("uploads" , req.params.name))
})

app.get("/api/categories/:name/items", (req,res)=>{
    Category.findOne({name : req.params.name}, (err, cat)=>{
        Item.find({category: cat._id}).sort({_id : -1}).populate("user").exec((err,products)=>{
            if(err) res.json({success : false , err})
            else res.json(products)
        })

    })
})

app.get("/api/categories", (req,res)=>{
    Category.find({} , (err,categories)=>{
        if(err) res.json({success : false , err})
        else res.json(categories)
    })
})
// Category.create({name : "Art"})
// Category.create({name : "Else"})

app.get("/api/search" , (req,res) => {
    var regex = {$regex : req.query.keyword, $options : "i"}
    if(req.query.usedfor == "People"){
        
        User.find({$or : [{username : regex} , {firstname : regex}, {lastname : regex}]} , (err , users)=>{
            if (err) res.json({success : false, err})
            else res.json({users})
        })
    }else if(req.query.usedfor == "Products"){
        Item.find({name : regex} , (err , products)=>{
            if (err) res.json({success : false, err})
            else res.json({products})
        })
    }else res.json({success : false})
})
app.get('/api/token' , passport.authenticate("jwt" , {session : false}) , (req,res)=>{
    res.json({success : true, user:req.user})
})
app.use('/:anything', express.static(__dirname + "/public") , function(req, res){
        res.sendFile(path.resolve(__dirname + "/public/index.html"))
});
app.get("*" , (req,res)=>res.sendFile(path.resolve(__dirname + "/public/index.html")))
app.listen(port, () => console.log(`app running on port ${port}`))
