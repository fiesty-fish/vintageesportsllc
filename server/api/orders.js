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

router.put('/:userId', async (req, res, next) => {
  try {
    console.log(req.body)
    const itemId = req.body.id
    const itemPrice = req.body.price
    const itemQuantity = req.body.quantity
    const order = await Order.findOrCreate({
      where: {userId: req.params.userId, checkedout: false}
    })
    // const updatedOrder = await Order.create(
    //   {
    //     orderId: order.id,
    //     itemId,
    //     quantity: itemQuantity,
    //     price: itemPrice,
    //     userId: req.params.userId
    //     // user: [{id: req.params.userId}]
    //   },
    //   // {include: [{association: Order.Item}]}
    //   {include: [User]}
    // )
    // console.log(updatedOrder)
    const updatedOrder = await ItemOrder.create({
      quantity: itemQuantity,
      price: itemPrice,
      itemId,
      orderId: order.id
    })
    res.json(updatedOrder)
  } catch (err) {
    next(err)
  }
})
