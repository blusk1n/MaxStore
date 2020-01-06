const express           = require("express"),
      bodyParser        = require("body-parser"),
      mongoose          = require("mongoose"),
      app               = express(),
      port              = process.env.PORT || 3000

    


app.use(express.static(__dirname + "/public"))
// app.use(bodyParser.json());
app.listen(port, () => console.log(`app running on port ${port}`))

module.exports = app;





// app.get('/api/user', function(req, res, next) {
//     console.log('Request Type:', req.method)
//     res.status(200).send('You are doing a great job')
//     next()
// })

