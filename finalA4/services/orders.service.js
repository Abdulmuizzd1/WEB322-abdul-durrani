const { orders } = require('../db')

class OrdersService {
    static findAll = async () => orders.findAll()

    static findById = async (id) => orders.findByPk(id)

    static create = async (order) => orders.create(order)

    static update = async (order) =>
        orders.update(order, { where: {
            id: order.id 
        }, 
        returning: true,
    })

    static delete = async (id) => orders.destroy({ where: { id } })
}

module.exports = OrdersService