import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getItemsThunk} from '../store/item'

class CartView extends Component {
  constructor() {
    super()
    this.handleRemoveFromCat = this.handleRemoveFromCart.bind(this)
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

  handleCheckout(totalCost) {
    if (localStorage.cart) {
      // ORDER MODEL THUNK CALL
      localStorage.clear()
      this.forceUpdate()
    }
  }

  render() {
    const {items} = this.props
    console.log('localStorage in CartView render: ', localStorage.cart)
    let cartItems
    let cartTotal
    if (localStorage.cart) {
      // get the keys of localStorage cart
      const cartItemId = Object.keys(JSON.parse(localStorage.cart))
      //  filter all the item from local storage key array
      cartItems = items.filter(item => cartItemId.includes(item.id.toString()))
      // calculate the total price of all items in cart
      cartTotal = cartItems.reduce((acc, item) => acc + item.price, 0)
    }

    return (
      <div>
        <ul>
          {cartItems
            ? cartItems.map(item => {
                return (
                  <div key={item.id}>
                    <li>
                      Name: {item.name}, Price: ${' '}
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
        <button onClick={() => this.handleCheckout(cartTotal)} type="button">
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
