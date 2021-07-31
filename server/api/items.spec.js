/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Item = db.model('item')

describe('Item routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/items/', () => {
    const game = {
      name: 'Super Mario 64',
      price: 3999,
      year: 1996,
      inventory: 999
    }

    beforeEach(() => {
      return Item.create(game)
    })

    it('GET /api/items', async () => {
      const res = await request(app)
        .get('/api/items')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].name).to.be.equal(game.name)
      expect(res.body[0].price).to.be.equal(game.price)
      expect(res.body[0].year).to.be.equal(game.year)
      expect(res.body[0].inventory).to.be.equal(game.inventory)
    })
  }) // end describe('/api/items')
}) // end describe('Item routes')
