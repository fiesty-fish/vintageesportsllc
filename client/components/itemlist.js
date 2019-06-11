import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getItemsThunk} from '../store/item'

class ItemList extends Component {
  componentDidMount() {
    this.props.loadAllItems()
  }

  handleAddToCart(itemId) {
    // If there's no localStorage cart existing make a cart key with an empty object
    if (!localStorage.cart) {
      localStorage.setItem('cart', JSON.stringify({}))
    }
    // Convert string to json
    let currentCart = JSON.parse(localStorage.cart)
    // If key exists for itemId increment quantity by one
    if (currentCart[itemId]) {
      currentCart[itemId] = currentCart[itemId] + 1
      // else set quantity to one
    } else {
      currentCart[itemId] = 1
    }
    // finally set the cart key to current object
    localStorage.setItem('cart', JSON.stringify(currentCart))
  }

  render() {
    const {items} = this.props
    return (
      <div>
        <ul>
          {items
            ? items.map(item => {
                return (
                  <div key={item.id}>
                    <li>{item.name}</li>{' '}
                    <button
                      type="button"
                      onClick={() => this.handleAddToCart(item.id)}
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
