import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getItemsThunk} from '../store/item'

class CartView extends Component {
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

  render() {
    const {items} = this.props
    // get the keys of localStorage cart
    const cartItemId = Object.keys(JSON.parse(localStorage.cart))
    //  filter all the item from local storage key array
    const cartItems = items.filter(item =>
      cartItemId.includes(item.id.toString())
    )

    return (
      <div>
        <ul>
          {cartItems
            ? cartItems.map(item => {
                return (
                  <div key={item.id}>
                    <li>{item.name}</li>
                    <button
                      type="button"
                      onClick={() => this.handleRemoveFromCart(item.id)}
                    >
                      Remove From Cart
                    </button>
                  </div>
                )
              })
            : null}
        </ul>
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
