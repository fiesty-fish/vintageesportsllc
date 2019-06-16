const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

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

// update user info route
router.put('/update', async (req, res, next) => {
  try {
    const {id, email, password} = req.body.user
    console.log('email>>>>>>>', email)
    // need instance to get hook to run, current hooks only run on instance methods, not model methods
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

// router.post('/', async (req, res, next) => {
//   try {
//     const userObj = {
//       email: req.body.email,
//       password: req.body.password,
//     };
//     const user = await User.create(userObj);
//     res.status(201).json(user);
//   } catch (error) {
//     next(error);
//   }
// });
