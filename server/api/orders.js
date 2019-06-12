const router = require('express').Router()
const {Order} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll()
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    console.log('req.body: ', req.body)
    // const {cartItems, cartItemsData, cartTotal} = req.body
    // const newOrderData = {cartItems, cartItemsData, cartTotal}
    const newOrderData = req.body
    console.log('newOrderData in POST route: ', newOrderData)
    const newOrder = await Order.create(newOrderData)
    res.json(newOrder)
  } catch (err) {
    next(err)
  }
})
