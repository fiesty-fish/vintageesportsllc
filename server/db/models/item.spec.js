/* global describe beforeEach it */

const chai = require('chai')
const {expect} = require('chai')
const Sequelize = require('sequelize')
const db = require('../index')
const Item = db.model('item')

chai.use(require('chai-as-promised'))

describe('Item model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('create item', () => {
    describe('invalid price', () => {
      const game = {
        name: 'Super Mario 64',
        price: 39.99,
        year: 1996,
        inventory: 999
      }

      it('fails if the price is a decimal', async () => {
        await expect(Item.create(game)).to.be.rejectedWith(
          Sequelize.DatabaseError
        )
      })
    }) // end describe('invalid price')
  }) // end describe('create item')
}) // end describe('Item model')
