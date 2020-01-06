const express           = require("express"),
      bodyParser        = require("body-parser"),
      mongoose          = require("mongoose"),
      app               = express(),
      port              = process.env.PORT || 3000

    


app.use(express.static(__dirname + "/public"))
app.listen(port)

