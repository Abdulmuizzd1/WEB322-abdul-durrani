const express = require('express')

const loginRoutes = require('./login')
const userRoutes = require('./users')
const productRoutes = require('./products')
const routes = express.Router()


routes.use('/', loginRoutes)
routes.use('/users', userRoutes)
routes.use('/products', productRoutes)


module.exports = routes
