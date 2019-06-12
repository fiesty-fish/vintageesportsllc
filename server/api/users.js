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
