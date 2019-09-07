import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'

import playSound from '../../script/utility-functions'

class SingleCartItem extends Component {
  constructor() {
    super()
    this.state = {
      quantity: 1
    }
    this.handleUpdateItem = this.handleUpdateItem.bind(this)
    this.handleIncrement = this.handleIncrement.bind(this)
    this.handleDecrement = this.handleDecrement.bind(this)
  }

  componentDidMount() {
    this.setState({
      quantity: JSON.parse(localStorage.cart)[this.props.item.id]
    })
  }

  async handleUpdateItem(item) {
    playSound('lvlup')
    // If there's no localStorage cart existing make a cart key with an empty object
    if (!localStorage.cart) {
      localStorage.setItem('cart', '{}')
    }
    // Convert string to json
    let currentCart = JSON.parse(localStorage.cart)

    const prevQuantity = currentCart[item.id]

    currentCart[item.id] = this.state.quantity

    // finally set the cart key to current object
    localStorage.setItem('cart', JSON.stringify(currentCart))
    // if a user is logged in, add the item to their order. if this is the first item added,
    // and there is no existing order, create a new order and add the item to it.
    if (this.props.user.id) {
      try {
        // get updated current quantity from local state
        const currQuantity = this.state.quantity
        // making the item's quantity = the difference between currentQuantity(local state) and prevQuantity(localStorage)
        item.quantity = currQuantity - prevQuantity
        const addToOrder = await axios.put(
          `/api/orders/edit/${this.props.user.id}`,
          {item}
        )
      } catch (error) {
        console.error(error)
      }
    }
    this.forceUpdate()
    this.props.handleUpdateCartView()
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
    const currCart = JSON.parse(localStorage.cart)
    return (
      <div>
        <h3>{item.name}</h3>
        <ul style={{listStyle: 'none'}}>
          <li>Quantity: {currCart[item.id]}</li>
          <li>Price: $ {(item.price * currCart[item.id] / 100).toFixed(2)}</li>
          <li>Price per unit: $ {(item.price / 100).toFixed(2)}</li>
        </ul>
        <div>
          <button
            onClick={this.handleDecrement}
            type="button"
            className="nes-btn inc-dec-btn button-no-text-shadow"
          >
            -
          </button>
          <span> {this.state.quantity} </span>
          <button
            onClick={this.handleIncrement}
            type="button"
            className="nes-btn inc-dec-btn button-no-text-shadow"
          >
            +
          </button>
          <span> </span>
          <button
            onClick={() => this.handleUpdateItem(item)}
            type="button"
            className="nes-btn is-primary"
          >
            Update
          </button>
        </div>
        <br />
        <div>
          <button
            onClick={() => {
              this.props.handleRemoveFromCart(item.id)
              playSound('death')
            }}
            type="button"
            className="nes-btn is-error"
          >
            Remove From Cart
          </button>
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

export default connect(mapState)(SingleCartItem)
