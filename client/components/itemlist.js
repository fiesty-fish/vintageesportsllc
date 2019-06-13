import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getItemsThunk} from '../store/item'
import axios from 'axios'

class ItemList extends Component {
  constructor() {
    super()
    this.handleAddToCart = this.handleAddToCart.bind(this)
  }

  componentDidMount() {
    this.props.loadAllItems()
  }

  async handleAddToCart(item) {
    // If there's no localStorage cart existing make a cart key with an empty object
    if (!localStorage.cart) {
      localStorage.setItem('cart', '{}')
    }
    // Convert string to json
    let currentCart = JSON.parse(localStorage.cart)
    // If key exists for itemId increment quantity by one
    if (currentCart[item.id]) {
      currentCart[item.id] = currentCart[item.id] + 1
      // else set quantity to one
    } else {
      currentCart[item.id] = 1
    }
    // finally set the cart key to current object
    localStorage.setItem('cart', JSON.stringify(currentCart))
    // if a user is logged in, add the item to their order. if this is the first item added,
    // and there is no existing order, create a new order and add the item to it.
    if (this.props.user.id) {
      try {
        console.log(item)
        const addToOrder = await axios.put(
          `/api/orders/${this.props.user.id}`,
          {item}
        )
      } catch (error) {
        console.error(error)
      }
    }
  }

  render() {
    const {items} = this.props
    return (
      <div>
        <h3>See our nice selection of vintage vidya games!</h3>
        <ul>
          {items
            ? items.map(item => {
                return (
                  <div key={item.id}>
                    <li>
                      Name: {item.name}, Price: ${' '}
                      {(item.price / 100).toFixed(2)}
                    </li>
                    <button
                      onClick={() => this.handleAddToCart(item)}
                      type="button"
                    >
                      Add To Cart
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
export default connect(mapState, mapDispatch)(ItemList)
