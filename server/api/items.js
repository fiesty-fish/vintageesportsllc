const router = require('express').Router()

const {Item, User} = require('../db/models')

module.exports = router

// url - localhost:8080/api/items
// middleware protection
const accessItemAuth = (req, res, next) => {
  console.log('req.user.id>>>>>>in middleware', req.user.id)
  console.log('req.params.userId>>>>>>in middleware', req.params.userId)
  if (req.user.id === +req.params.userId) {
    console.log('werked>>>>>>>', req.user.id, req.params.userId)
    next()
  } else {
    res.status(401).send('Access Denied')
  }
}

router.get('/', async (req, res, next) => {
  try {
    const items = await Item.findAll()
    res.json(items)
  } catch (err) {
    next(err)
  }
})

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
        returnning: true
      })
      res.json(updateItem)
    } else {
      res.json('USER DOES NOT EXIST OR IS NOT AN ADMIN')
    }
  } catch (err) {
    next(err)
  }
})
