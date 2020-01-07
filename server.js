const express           = require("express"),
      bodyParser        = require("body-parser"),
      mongoose          = require("mongoose"),
      app               = express(),
      users             = require('./routes/users.js'),
      items             = require('./routes/items.js')
      port              = process.env.PORT || 3000
const passport = require('passport')
    


app.use(express.static(__dirname + "/public"))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true})); 

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());




app.use('/api/users', users)
app.use('/api/items', items)
app.listen(port, () => console.log(`app running on port ${port}`))





