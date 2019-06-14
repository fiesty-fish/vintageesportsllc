import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'

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
    // If there's no localStorage cart existing make a cart key with an empty object
    if (!localStorage.cart) {
      localStorage.setItem('cart', '{}')
    }
    // Convert string to json
    let currentCart = JSON.parse(localStorage.cart)

    currentCart[item.id] = this.state.quantity

    // finally set the cart key to current object
    localStorage.setItem('cart', JSON.stringify(currentCart))
    // if a user is logged in, add the item to their order. if this is the first item added,
    // and there is no existing order, create a new order and add the item to it.
    if (this.props.user.id) {
      try {
        item.quantity = currentCart[item.id]
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
    const currQuantity = this.state.quantity
    if (currQuantity < 10) {
      this.setState({
        quantity: currQuantity + 1
      })
    }
  }

  handleDecrement() {
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
      <div>
        <li>
          Name: {item.name}, Price: $ {(item.price / 100).toFixed(2)}
        </li>
        <button onClick={this.handleDecrement} type="button">
          -
        </button>
        <span>{this.state.quantity}</span>
        <button onClick={this.handleIncrement} type="button">
          +
        </button>
        <button onClick={() => this.handleAddToCart(item)} type="button">
          Add To Cart
        </button>
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