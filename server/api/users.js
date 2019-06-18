const router = require('express').Router()

const {User} = require('../db/models')

module.exports = router

// url - localhost:8080/users

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.put('/update', async (req, res, next) => {
  try {
    const {id, email, password} = req.body
    const userToUpdate = await User.findByPk(id)
    const updatedUser = await userToUpdate.update({
      email,
      password
    })
    res.json(updatedUser)
  } catch (error) {
    next(error)
  }
})
