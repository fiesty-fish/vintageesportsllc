import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getItemsThunk} from '../store/item'
import axios from 'axios'

class CartView extends Component {
  constructor() {
    super()
    this.handleRemoveFromCart = this.handleRemoveFromCart.bind(this)
    this.handleCheckout = this.handleCheckout.bind(this)
  }

  componentDidMount() {
    this.props.loadAllItems()
  }

  handleRemoveFromCart(itemId) {
    // get the json object from localStorage
    const currentCart = JSON.parse(localStorage.cart)
    // delete the key pair from cart object
    delete currentCart[itemId]
    // reset the cart to stringify
    localStorage.cart = JSON.stringify(currentCart)
    // causes a re-render without the shouldComponentMount lifecycle hook
    this.forceUpdate()
  }

  async handleCheckout(orderObj) {
    if (localStorage.cart) {
      try {
        console.log('orderObj in handleCheckout: ', orderObj)
        const {data} = await axios.post('/api/orders', {
          order: orderObj
        })
        console.log('orderData in handleCheckout: ', data)
      } catch (error) {
        console.error(error)
      }
      // handle totalCost charge
      localStorage.clear()
      this.forceUpdate()
    }
  }

  render() {
    const {items} = this.props
    console.log('localStorage in CartView render: ', localStorage.cart)
    let cartItems
    let cartItemsData
    let cartTotal
    let curOrder
    if (localStorage.cart) {
      // get the keys of localStorage cart
      cartItems = JSON.parse(localStorage.cart)
      const cartItemsIds = Object.keys(cartItems)
      //  filter all the item from local storage key array
      cartItemsData = items.filter(item =>
        cartItemsIds.includes(String(item.id))
      )
      // calculate the total price of all items in cart
      cartTotal = cartItemsData.reduce(
        (acc, item) => acc + item.price * cartItems[item.id],
        0
      )
      curOrder = {cartItems, cartItemsData, cartTotal}
    }

    return (
      <div>
        <ul>
          {cartItemsData
            ? cartItemsData.map(item => {
                return (
                  <div key={item.id}>
                    <li>
                      <strong>Name: </strong>
                      {item.name}, <strong>Quantity: </strong>
                      {cartItems[item.id]}, <strong>Price: </strong>${' '}
                      {(item.price * cartItems[item.id] / 100).toFixed(2)},{' '}
                      <strong>Price per unit: </strong>${' '}
                      {(item.price / 100).toFixed(2)}
                    </li>
                    <button
                      onClick={() => this.handleRemoveFromCart(item.id)}
                      type="button"
                    >
                      Remove From Cart
                    </button>
                  </div>
                )
              })
            : null}
        </ul>
        <div>
          Total: $ {cartTotal ? (cartTotal / 100).toFixed(2) : (0).toFixed(2)}
        </div>
        <button onClick={() => this.handleCheckout(curOrder)} type="button">
          Checkout
        </button>
      </div>
    )
  }
}

const mapState = state => {
  return {
    items: state.item
  }
}

const mapDispatch = dispatch => {
  return {
    loadAllItems() {
      dispatch(getItemsThunk())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default connect(mapState, mapDispatch)(CartView)
