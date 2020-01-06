const express           = require("express"),
      bodyParser        = require("body-parser"),
      mongoose          = require("mongoose"),
      app               = express(),
      users             = require('./routes/users.js'),
      items             = require('./routes/items.js')
      port              = process.env.PORT || 3000

    


app.use(express.static(__dirname + "/public"))
app.use('/api/users', users)
// app.use(bodyParser.json());
app.use('/api/items', items)
app.listen(port, () => console.log(`app running on port ${port}`))






// app.get('/api', function(req, res, next) {
//     console.log('Request Type:', req.method)
//     res.status(200).send('You are doing')
//     next()
// })

