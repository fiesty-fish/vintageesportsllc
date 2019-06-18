import React, {Component} from 'react'
import {connect} from 'react-redux'
// import axios from 'axios'
import {getItemsThunk} from '../store/index'
import SingleInventory from './singleinventory'

class Inventory extends Component {
  componentDidMount() {
    this.props.loadInventory()
  }

  async handleUpdateItem(item) {
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
  }

  render() {
    const {items} = this.props

    return (
      <div>
        <h3>Inventory</h3>
        {items.map(item => {
          return <SingleInventory key={item.id} item={item} />
        })}
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
    loadInventory() {
      dispatch(getItemsThunk())
    }
  }
}

export default connect(mapState, mapDispatch)(Inventory)
