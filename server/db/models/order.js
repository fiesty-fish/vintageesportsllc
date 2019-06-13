const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  checkedout: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false
  }
})

module.exports = Order
