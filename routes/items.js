const route = module.exports = require('express').Router()


route.get('/', function(req, res) {
    res.json({"route":"/items"})
})