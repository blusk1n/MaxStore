const express           = require("express"),
      bodyParser        = require("body-parser"),
      mongoose          = require("mongoose"),
      app               = express(),
      path              = require("path"),
      port              = process.env.PORT || 3000

    


app.use(express.static(__dirname + "/public"))
app.get("*" , (req,res)=>res.sendFile(path.resolve("public" , "index.html")))
app.listen(port)



// money
