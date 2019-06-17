import React, {Component} from 'react'
import {connect} from 'react-redux'
// import axios from 'axios'
import {getAdminItemsThunk} from '../store/index'

class Inventory extends Component {
  constructor() {
    super()
    this.state = {
      quantity: 1
      // inventory:
    }
    this.handleUpdateItem = this.handleUpdateItem.bind(this)
    this.handleIncrement = this.handleIncrement.bind(this)
    this.handleDecrement = this.handleDecrement.bind(this)
  }

  componentDidMount() {
    console.log('USER ----->', this.props)
    // const inventory = this.props.loadInventory(this.props.user.id)
    // console.log('INVENTORY', inventory)
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
    // const {item} = this.props
    // const currCart = JSON.parse(localStorage.cart)
    // console.log('USER ---->', this.props.user.id)
    console.log(getAdminItemsThunk(this.props.user.id))
    return (
      <div>
        <h3>Inventory</h3>
        <h1 />
        {/* <h3>{`Name: ${item.name}`}</h3>
        <ul>
          <li>{`Quantity: ${currCart[item.id]}`}</li>
          <li>{`Price: $ ${(item.price * currCart[item.id] / 100).toFixed(
            2
          )}`}</li>
          <li>{`Price per unit: $ ${(item.price / 100).toFixed(2)}`}</li>
        </ul>
        <button onClick={this.handleDecrement} type="button">
          -
        </button>
        <span>{this.state.quantity}</span>
        <button onClick={this.handleIncrement} type="button">
          +
        </button>
        <button onClick={() => this.handleUpdateItem(item)} type="button">
          Update
        </button>
        <button
          onClick={() => this.props.handleRemoveFromCart(item.id)}
          type="button"
        >
          Remove From Cart */}
        {/* </button> */}
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    loadInventory(admin) {
      dispatch(() => getAdminItemsThunk(admin))
    }
  }
}

export default connect(mapState, mapDispatch)(Inventory)
