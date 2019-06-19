const router = require('express').Router()

const {Item, User} = require('../db/models')

module.exports = router

// url - localhost:8080/api/items

// middleware protection for admins
const accessItemAuth = (req, res, next) => {
  if (req.user.id === +req.params.userId && req.user.admin) {
    next()
  } else {
    res.status(401).send('Access Denied')
  }
}

// get all items
router.get('/', async (req, res, next) => {
  try {
    const items = await Item.findAll()
    res.json(items)
  } catch (err) {
    next(err)
  }
})

// add a new item to the db
router.post('/:userId', accessItemAuth, async (req, res, next) => {
  try {
    const newItemData = {
      name: req.body.item.name,
      price: req.body.item.price,
      imageUrl: req.body.item.imageUrl,
      year: req.body.item.year,
      inventory: req.body.item.inventory,
      description: req.body.item.description
    }
    const curUser = await User.findByPk(req.params.userId)
    if (curUser && curUser.admin) {
      const createNewItem = await Item.create(newItemData)
      res.json(createNewItem)
    } else {
      res.json('USER DOES NOT EXIST OR IS NOT AN ADMIN')
    }
  } catch (err) {
    next(err)
  }
})

// update inventory for an item
router.put('/:userId', accessItemAuth, async (req, res, next) => {
  try {
    const updatedItemData = {
      name: req.body.item.name,
      inventory: req.body.item.inventory
    }
    const curUser = await User.findByPk(req.params.userId)
    if (curUser && curUser.admin) {
      const updateItem = await Item.update(updatedItemData, {
        where: {
          name: updatedItemData.name
        },
        returning: true
      })
      res.json(updateItem)
    } else {
      res.json('USER DOES NOT EXIST OR IS NOT AN ADMIN')
    }
  } catch (err) {
    next(err)
  }
})
