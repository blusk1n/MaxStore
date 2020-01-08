const express = require("express"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    app = express(),
    users = require('./routes/users.js'),
    items = require('./routes/items.js'),
    path = require("path"),
    port = process.env.PORT || 3000
const passport = require('passport')


mongoose.connect('mongodb://maxst0re:maxst0re@ds149676.mlab.com:49676/maxstore', { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log("database is working"))
app.use(express.static(__dirname + "/public"))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport)


app.use('/api/users', users)
app.use('/api/items', items)
app.get("*", (req, res) => res.sendFile(path.resolve("public", "index.html")))
app.listen(port, () => console.log(`app running on port ${port}`))






// money
