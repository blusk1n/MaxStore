// const express = require('express')
// const app = express() 

const app = require('../server.js')
console.log(app)


app.get('/api', function(req, res, next) {
    console.log('Request Type:', req.method)
    res.status(200).send('You are doing a great job')
    next()
})

