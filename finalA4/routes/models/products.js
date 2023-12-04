const express = require('express')
const apiProducts = express.Router()

const ProductsService = require('../../services/product.service')

apiProducts.get('/', async (req, res) => 
    res.json(await ProductsService.findAll())
)

apiProducts.get('/:id', async (req, res) =>
    res.json(await ProductsService.findById(req.params.id))
)

apiProducts.delete('/:id', async (req, res) =>
    res.json(await ProductsService.delete(req.params.id))
)

apiProducts.post('/', async (req, res) =>
    res.json(await ProductsService.create({...req.body}))
)


module.exports = apiProducts