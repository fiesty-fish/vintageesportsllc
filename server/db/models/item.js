const Sequelize = require('sequelize')
const db = require('../db')

const Item = db.define('item', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  // Price is in cents.
  price: {
    type: Sequelize.INTEGER,
    validate: {
      min: 1
    },
    allowNull: false
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: '/default.png'
  },
  year: {
    type: Sequelize.INTEGER,
    validate: {
      min: 1972,
      max: 2020
    },
    allowNull: false
  },
  inventory: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    },
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT
  }
})

module.exports = Item
