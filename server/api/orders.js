const router = require('express').Router({mergeParams: true})
const {Order, ItemOrder, User, Item} = require('../db/models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
module.exports = router

// middleware for protecting /api/orders routes
const accessUserOrders = (req, res, next) => {
  console.log('req.user.id>>>>>>in middleware', req.user.id)
  console.log('req.params.userId>>>>>>in middleware', req.params.userId)
  next()
  // if (req.path === '/') {
  //   console.log('home path');
  //   next();
  // } else if (req.user.id === req.params.userId) {
  //   console.log('req.params.userId', req.params.userId);
  //   next();
  // } else {
  //   // console.log('req.hostname', req.hostname);
  //   res.render('Access Denied');
  //   // res.redirect('/');
  // }
}
//TODO: try to move the middleware into each function bc the req.params.userId does not appear.

// router.use('*', accessUserOrders);

// url - localhost:8080/orders

router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll()
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

router.get('/past/:userId', accessUserOrders, async (req, res, next) => {
  console.log('req.params.userId in route>>>>', req.params.userId)
  try {
    const curUserClosedOrders = await Order.findAll({
      where: {userId: req.params.userId, checkedout: true}
    })
    if (curUserClosedOrders.length) {
      const curUserClosedOrdersIdsArr = curUserClosedOrders.map(
        curOrder => curOrder.id
      )
      console.log(
        'curUserClosedOrdersIdsArr: ',
        curUserClosedOrdersIdsArr,
        'is of type: ',
        Array.isArray(curUserClosedOrdersIdsArr)
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

router.get('/:userId', async (req, res, next) => {
  console.log(req.params.userId)
  try {
    const curUserOpenOrder = await Order.findOne({
      where: {userId: req.params.userId, checkedout: false}
    })
    console.log('curUserOpenOrder: ', curUserOpenOrder)
    if (curUserOpenOrder) {
      if (curUserOpenOrder.id) {
        const curOrderItems = await ItemOrder.findAll()
        res.json(curOrderItems)
      }
    } else {
      res.json('NO OPEN ORDER FOUND')
    }
  } catch (err) {
    next(err)
  }
})

// edit quantity of item in cart
router.put('/edit/:userId', async (req, res, next) => {
  try {
    console.log('req.body.item.id: ', req.body.item.id)
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

// remove item from cart
router.put('/remove/:userId', async (req, res, next) => {
  try {
    const itemId = req.body.itemId

    // get user's open order object
    const openOrder = await Order.findOne({
      where: {userId: req.params.userId, checkedout: false}
    })

    // find itemOrderObj using itemId and openOrderId
    const numOfAffectedRows = await ItemOrder.destroy({
      // const [ numDestroyedRows, destroyedItemObj ] = await ItemOrder.destroy({
      where: {
        itemId: itemId,
        orderId: openOrder.id
      },
      returning: true
      // plain: true,
    })
    res.json(numOfAffectedRows)
  } catch (error) {
    next(error)
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
