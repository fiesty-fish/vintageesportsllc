import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getItemsThunk} from '../store/item'
import axios from 'axios'
import SingleCartItem from './singlecartitem'

class CartView extends Component {
  constructor() {
    super()
    this.state = {
      merged: false
    }
    this.handleRemoveFromCart = this.handleRemoveFromCart.bind(this)
    this.handleCheckout = this.handleCheckout.bind(this)
  }

  async componentDidMount() {
    this.props.loadAllItems()
    await this.handleCart(this.props.user)
  }

  async handleCart(user) {
    // if there is a user logged in
    if (user.id) {
      if (!this.state.merged) {
        this.setState({merged: true})
        // retrieve an open order for logged in user by user id
        const {data} = await axios.get(`/api/orders/${user.id}`)
        // if the user has an open order with items in it
        if (data.length) {
          // if the user had items in their localStorage cart as a guest
          if (localStorage.cart) {
            // make the cart object accessible
            const curCart = JSON.parse(localStorage.cart)
            // for each item in the data retrieved
            data.forEach(async curItem => {
              // if localStorage cart has that specific item
              if (curCart[curItem.itemId]) {
                // if localStorage specific item quantity is NOT equal to specific curItem quantity
                if (curCart[curItem.itemId] !== curItem.quantity) {
                  // capture guest cart specific item quantity
                  const curGuestCartQuantity = curCart[curItem.itemId]
                  // set guest cart specific item quantity to be the sum of the guest quantity and the quantity from the database
                  curCart[curItem.itemId] =
                    curCart[curItem.itemId] + curItem.quantity
                  // update that specific item on the backend with the new total quantity
                  const updateCurItemQuantity = await axios.put(
                    `/api/orders/edit/${user.id}`,
                    {
                      item: {
                        id: curItem.itemId,
                        price: curItem.price,
                        quantity: curGuestCartQuantity
                      }
                    }
                  )
                }
              } else {
                // if localStorage cart DOES NOT have that specific item, add the item to the localStorage cart and set it's quantity to the quantity in the database
                curCart[curItem.itemId] = curItem.quantity
              }
            })
            // set the localStorage cart to the updated cart object
            localStorage.clear()
            localStorage.setItem('cart', JSON.stringify(curCart))
          } else {
            // if the user DID NOT have items in their localStorage cart as a guest, reduce the items in the open order in the backend into an object
            const retrievedCart = data.reduce((acc, curItem) => {
              acc[curItem.itemId] = curItem.quantity
              return acc
            }, {})
            // set the localStorage cart to the newly created cart object
            localStorage.setItem('cart', JSON.stringify(retrievedCart))
          }
        }
      }
    }
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
        <div>
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
        </div>
        <hr />
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
