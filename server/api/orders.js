const router = require('express').Router()
const {Order, ItemOrder} = require('../db/models')
const Sequelize = require('sequelize')
if (process.env.NODE_ENV !== 'production') require('../../secrets')
const stripe = require('stripe')(process.env.stripeTestApiKey)
const Op = Sequelize.Op
const uuid = require('uuid/v4')

module.exports = router

// url - localhost:8080/orders
// middleware for protecting /api/orders routes
const accessUserOrdersAuth = (req, res, next) => {
  if (req.user.id === +req.params.userId) {
    next()
  } else {
    res.status(401).send('Access Denied')
  }
}

router.get('/past/:userId', accessUserOrdersAuth, async (req, res, next) => {
  try {
    const curUserClosedOrders = await Order.findAll({
      where: {userId: req.params.userId, checkedout: true}
    })
    if (curUserClosedOrders.length) {
      const curUserClosedOrdersIdsArr = curUserClosedOrders.map(
        curOrder => curOrder.id
      )
      const curUserClosedOrdersItems = await ItemOrder.findAll({
        where: {
          orderId: {
            [Op.in]: curUserClosedOrdersIdsArr
          }
        }
      })
      res.json(curUserClosedOrdersItems)
    } else {
      res.json('NO CLOSED ORDER FOUND')
    }
  } catch (err) {
    next(err)
  }
})

router.get('/:userId', accessUserOrdersAuth, async (req, res, next) => {
  try {
    const curUserOpenOrder = await Order.findOne({
      where: {userId: req.params.userId, checkedout: false}
    })
    if (curUserOpenOrder) {
      if (curUserOpenOrder.id) {
        const curOrderItems = await ItemOrder.findAll({
          where: {
            orderId: curUserOpenOrder.id
          }
        })
        res.json(curOrderItems)
      }
    } else {
      res.json('NO OPEN ORDER FOUND')
    }
  } catch (err) {
    next(err)
  }
})

router.put('/edit/:userId', accessUserOrdersAuth, async (req, res, next) => {
  try {
    if (req.body.item.id) {
      const itemId = req.body.item.id
      const itemPrice = req.body.item.price
      const itemQuantity = req.body.item.quantity
      // find if open order exists based on user id (logged in users only)
      const [orderData] = await Order.findOrCreate({
        where: {userId: req.params.userId, checkedout: false}
      })
      // find if specific item by id exists in specific order for specific user
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
    }
  } catch (err) {
    next(err)
  }
})

router.put('/remove/:userId', accessUserOrdersAuth, async (req, res, next) => {
  try {
    const itemId = req.body.itemId
    // get user's open order object
    const openOrder = await Order.findOne({
      where: {userId: req.params.userId, checkedout: false}
    })
    // find itemOrderObj using itemId and openOrderId
    const numOfAffectedRows = await ItemOrder.destroy({
      where: {
        itemId: itemId,
        orderId: openOrder.id
      },
      returning: true
    })
    res.json(numOfAffectedRows)
  } catch (error) {
    next(error)
  }
})

// checkout route changes open order checkedout property to true and closes it
router.put(
  '/checkout/:userId',
  accessUserOrdersAuth,
  async (req, res, next) => {
    try {
      const orderData = await Order.findOne({
        where: {userId: req.params.userId, checkedout: false}
      })
      const updatedOrder = await orderData.update({checkedout: true})
      res.json(updatedOrder)
    } catch (err) {
      next(err)
    }
  }
)

router.post('/stripecheckout', async (req, res) => {
  console.log('Request:', req.body)

  let error
  let status
  try {
    const {product, token} = req.body

    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id
    })

    const idempotency_key = uuid()
    const charge = await stripe.charges.create(
      {
        amount: 100,
        currency: 'usd',
        customer: customer.id,
        receipt_email: token.email,
        description: `Purchased the ${product.name}`,
        shipping: {
          name: token.card.name,
          address: {
            line1: token.card.address_line1,
            line2: token.card.address_line2,
            city: token.card.address_city,
            country: token.card.address_country,
            postal_code: token.card.address_zip
          }
        }
      },
      {
        idempotency_key
      }
    )
    console.log('Charge:', {charge})
    status = 'success'
  } catch (error) {
    console.error('Error:', error)
    status = 'failure'
  }
  res.json({error, status})
})
