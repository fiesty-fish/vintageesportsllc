const Sequelize = require('sequelize')
const db = require('../db')

const ItemOrder = db.define('itemorder', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 1
    }
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 1
    }
  }
})

module.exports = ItemOrder
