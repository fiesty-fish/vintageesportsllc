const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  order: {
    type: Sequelize.JSON,
    allowNull: false
  }
})

module.exports = Order
