const express = require('express')

const apiLogin = require('./models/login')
const apiUsers = require('./models/users')
const apiProd = require('./models/products')
const apiOrders = require('./models/orders')


const apiRoutes = express.Router()

apiRoutes.use('/api/login', apiLogin)
apiRoutes.use('/users', apiUsers)
apiRoutes.use('/products', apiProd)
apiRoutes.use('/orders', apiOrders)

module.exports = apiRoutes
