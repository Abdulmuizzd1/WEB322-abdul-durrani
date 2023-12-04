const express = require('express')
const apiProducts = express.Router()
const {template} = require('./htmlUtils')

const products = require('../data/fakeProducts')

apiProducts.get('/', (req, res) => 
    //make a table to display products
    res.send(template("Products", products))
)

module.exports = apiProducts