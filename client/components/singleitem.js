import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'

import playSound from '../../script/utility-functions'

class SingleItem extends Component {
  constructor() {
    super()
    this.state = {
      quantity: 1
    }
    this.handleAddToCart = this.handleAddToCart.bind(this)
    this.handleIncrement = this.handleIncrement.bind(this)
    this.handleDecrement = this.handleDecrement.bind(this)
  }

  async handleAddToCart(item) {
    playSound('lvlup')
    // If there's no localStorage cart existing make a cart key with an empty object
    if (!localStorage.cart) {
      localStorage.setItem('cart', '{}')
    }
    // Convert string to json
    let currentCart = JSON.parse(localStorage.cart)

    // if item key exists in cart then add quantity to the existing value, else initialize with quantity
    currentCart[item.id] = currentCart[item.id]
      ? currentCart[item.id] + this.state.quantity
      : this.state.quantity

    // finally set the cart key to current object
    localStorage.setItem('cart', JSON.stringify(currentCart))
    // if a user is logged in, add the item to their order. if this is the first item added,
    // and there is no existing order, create a new order and add the item to it.
    //below is axios push to db
    if (this.props.user.id) {
      try {
        item.quantity = this.state.quantity
        const addToOrder = await axios.put(
          `/api/orders/edit/${this.props.user.id}`,
          {item}
        )
      } catch (error) {
        console.error(error)
      }
    }
  }

  handleIncrement() {
    playSound('coin')
    const currQuantity = this.state.quantity
    if (currQuantity < 10) {
      this.setState({
        quantity: currQuantity + 1
      })
    }
  }

  handleDecrement() {
    playSound('coin')
    const currQuantity = this.state.quantity
    if (currQuantity > 1) {
      this.setState({
        quantity: currQuantity - 1
      })
    }
  }

  render() {
    const {item} = this.props
    return (
      <div className="card">
        <div className="card-name">
          <h5>{item.name}</h5>
        </div>

        <div className="card-interior">
          <div>
            <img src={item.imageUrl} className="item-image" />
          </div>

          <div className="info-and-button">
            <div>
              <h5 id="item-price">${(item.price / 100).toFixed(2)}</h5>
            </div>
            <div className="card-buttons">
              <button
                onClick={this.handleDecrement}
                type="button"
                className="nes-btn inc-dec-btn button-no-text-shadow"
              >
                -
              </button>
              <span>{this.state.quantity}</span>
              <button
                onClick={this.handleIncrement}
                type="button"
                className="nes-btn inc-dec-btn button-no-text-shadow"
              >
                +
              </button>
            </div>

            <div>
              <button
                className="nes-btn is-success"
                onClick={() => this.handleAddToCart(item)}
                type="button"
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user
  }
}

export default connect(mapState)(SingleItem)
