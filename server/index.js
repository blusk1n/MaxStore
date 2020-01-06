    
// import app from '../server'
const app = require('../server') 

    


app.get('/api', function(req, res, next) {
    console.log('Request Type:', req.method)
    res.status(200).send('You are doing a great job')
    next()
})

