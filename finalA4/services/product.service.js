const { products } = require('../db')

class ProductsService{
    static findAll = async () => products.findAll()

    static findById = async (id) => products.findByPk(id)

    static create = async (product) => products.create(product)

    static update = async (product) =>
        products.update(product, { where: {
            id: product.id 
        }, 
        returning: true,
    })

    static delete = async (id) => products.destroy({ where: { id } })
}

module.exports = ProductsService