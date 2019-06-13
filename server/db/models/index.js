const User = require('./user')
const Item = require('./item')
const Order = require('./order')
const ItemOrder = require('./itemorder')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

// a single order belongs to one user
Order.belongsTo(User)
// one user can have many orders over time
User.hasMany(Order)

// each item can belongs to many orders
Item.belongsToMany(Order, {through: ItemOrder})
// each order can contain many items
Order.belongsToMany(Item, {through: ItemOrder})

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

module.exports = {
  User,
  Item,
  Order
}
