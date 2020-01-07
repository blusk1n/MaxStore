const express           = require("express"),
      bodyParser        = require("body-parser"),
      mongoose          = require("mongoose"),
      app               = express(),
      path              = require("path"),
      port              = process.env.PORT || 3000

    


      app.get("*" , (req,res)=>res.sendFile(path.resolve("public" , "index.html")))
app.use(express.static(__dirname + "/public"))
app.listen(port)



// money
