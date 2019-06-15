import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getItemsThunk} from '../store/item'
import axios from 'axios'
import SingleCartItem from './singlecartitem'

class CartView extends Component {
  constructor() {
    super()
    this.handleRemoveFromCart = this.handleRemoveFromCart.bind(this)
    this.handleCheckout = this.handleCheckout.bind(this)
  }

  componentDidMount() {
    this.props.loadAllItems()
  }

  async handleRemoveFromCart(itemId) {
    // if user.id, means we are logged in
    if (this.props.user.id) {
      const removedItem = await axios.put(
        `/api/orders/remove/${this.props.user.id}`,
        {itemId: +itemId}
      )
    }

    // remove from localStorage as well
    // get the json object from localStorage
    const currentCart = JSON.parse(localStorage.cart)
    // delete the key pair from cart object
    delete currentCart[itemId]
    // reset the cart to stringify
    localStorage.cart = JSON.stringify(currentCart)
    // causes a re-render without the shouldComponentMount lifecycle hook
    this.forceUpdate()
  }

  async handleCheckout() {
    if (localStorage.cart) {
      if (this.props.user.id) {
        try {
          const {data} = await axios.put(
            `/api/orders/checkout/${this.props.user.id}`
          )
          // console.log('orderData in handleCheckout: ', data)
        } catch (error) {
          console.error(error)
        }
      }
      // handle totalCost charge
      localStorage.clear()
      this.forceUpdate()
    }
  }

  render() {
    const {items} = this.props

    let cartItems
    let cartItemsData
    let cartTotal

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
    }

    return (
      <div>
        <h3>This is your cart!</h3>
        <ul>
          {cartItemsData
            ? cartItemsData.map(item => {
                return (
                  <SingleCartItem
                    key={item.id}
                    item={item}
                    handleRemoveFromCart={this.handleRemoveFromCart}
                  />
                )
              })
            : null}
        </ul>
        <div>
          Total: $ {cartTotal ? (cartTotal / 100).toFixed(2) : (0).toFixed(2)}
        </div>
        <button onClick={this.handleCheckout} type="button">
          Checkout
        </button>
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user,
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
