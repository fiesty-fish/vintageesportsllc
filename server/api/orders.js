const router = require('express').Router()
const {Order, ItemOrder, User, Item} = require('../db/models')
module.exports = router

// url - localhost:8080/orders

router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll()
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

// router.put('/:userId', async (req, res, next) => {
//   try {
//     const itemId = req.body.id
//     const itemPrice = req.body.price
//     const itemQuantity = req.body.quantity
//     const [orderData] = await Order.findOrCreate({
//       where: {userId: req.params.userId, checkedout: false}
//     })
//     const itemInOrderCheck = await ItemOrder.findOne({
//       where: {itemId, orderId: orderData.id}
//     })
//     let updatedOrder
//     if (itemInOrderCheck) {
//       updatedOrder = await itemInOrderCheck.update({
//         quantity: itemInOrderCheck.quantity + itemQuantity
//       })
//     } else {
//       updatedOrder = await ItemOrder.create({
//         quantity: itemQuantity,
//         price: itemPrice,
//         itemId,
//         orderId: orderData.id
//       })
//     }
//     res.json(updatedOrder)
//   } catch (err) {
//     next(err)
//   }
// })

router.put('/edit/:userId', async (req, res, next) => {
  try {
    // console.log(req.body.item.id)
    const itemId = req.body.item.id
    const itemPrice = req.body.item.price
    const itemQuantity = req.body.item.quantity
    // find if open order exists based on user id (logged in users only)
    const [orderData] = await Order.findOrCreate({
      where: {userId: req.params.userId, checkedout: false}
    })
    // find if specific item by id exists in specific order for specific user
    console.log('itemId: ', itemId, typeof itemId)
    const itemInOrderCheck = await ItemOrder.findOne({
      where: {itemId, orderId: orderData.id}
    })
    let updatedOrder
    // if we found that the specific order has this specific item already
    if (itemInOrderCheck) {
      // we will update the quantity of this specific item for this specific order
      updatedOrder = await itemInOrderCheck.update({
        quantity: itemInOrderCheck.quantity + itemQuantity
      })
    } else {
      // if there is no specific item by itemid in this specific order,
      // create a new item order with the given price, quantity, etc.
      updatedOrder = await ItemOrder.create({
        quantity: itemQuantity,
        price: itemPrice,
        itemId,
        orderId: orderData.id
      })
    }
    res.json(updatedOrder)
  } catch (err) {
    next(err)
  }
})

// checkout route changes open order checkedout property to true and closes it
router.put('/checkout/:userId', async (req, res, next) => {
  try {
    const orderData = await Order.findOne({
      where: {userId: req.params.userId, checkedout: false}
    })
    const updatedOrder = await orderData.update({checkedout: true})
    res.json(updatedOrder)
  } catch (err) {
    next(err)
  }
})
