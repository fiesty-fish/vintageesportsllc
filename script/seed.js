'use strict'

const db = require('../server/db')
const {User, Item, Order, ItemOrder} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      email: 'cody@email.com',
      password: '123',
      admin: true,
      superAdmin: true
    }),
    User.create({email: 'murphy@email.com', password: '123', admin: true})
  ])

  const items = await Promise.all([
    Item.create({
      name: 'Super Mario 64',
      price: 3999,
      year: 1996,
      inventory: 999
    }),
    Item.create({
      name: 'Mario Kart',
      price: 5499,
      year: 1972,
      inventory: 998
    })
  ])

  const orders = await Promise.all([
    Order.create({
      userId: 1,
      checkedout: true
    }),
    Order.create({
      userId: 1
    })
  ])

  const itemOrder = await Promise.all([
    ItemOrder.create({
      quantity: 1,
      price: 5999,
      itemId: 1,
      orderId: 1
    }),
    ItemOrder.create({
      quantity: 1,
      price: 3999,
      itemId: 2,
      orderId: 1
    }),
    ItemOrder.create({
      quantity: 1,
      price: 5999,
      itemId: 1,
      orderId: 2
    }),
    ItemOrder.create({
      quantity: 1,
      price: 3999,
      itemId: 2,
      orderId: 2
    })
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${items.length} items`)
  console.log(`seeded ${orders.length} orders`)
  console.log(`seeded ${itemOrder.length} items in orders`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
