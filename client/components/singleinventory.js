import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'

class SingleInventory extends Component {
  constructor() {
    super()
    this.state = {
      quantity: 0
    }
    this.handleUpdateItem = this.handleUpdateItem.bind(this)
    this.handleIncrement = this.handleIncrement.bind(this)
    this.handleDecrement = this.handleDecrement.bind(this)
  }

  async handleUpdateItem(item) {
    try {
      await axios.put(`/api/items/${this.props.user.id}`, {item})
      console.log('PROPS USER ID----->', this.props)
      console.log('Item OBJ', item)
    } catch (error) {
      console.error(error)
    }
    this.forceUpdate()
  }

  handleIncrement() {
    const currQuantity = this.state.quantity
    const totalInventory = this.props.item.inventory + this.state.quantity
    if (currQuantity < 999 && totalInventory < 1000) {
      this.setState({
        quantity: currQuantity + 1
      })
    }
  }

  handleDecrement() {
    const currQuantity = this.state.quantity
    const totalInventory = this.props.item.inventory + this.state.quantity
    if (currQuantity >= -999 && totalInventory > 0) {
      this.setState({
        quantity: currQuantity - 1
      })
    }
  }

  render() {
    const {item} = this.props
    const updatedItem = {
      name: item.name,
      inventory: this.state.quantity + item.inventory
    }
    return (
      <div>
        <h3>{`Name: ${item.name}`}</h3>
        <h5>Inventory: </h5>
        <button onClick={this.handleDecrement} type="button">
          -
        </button>
        <span>{item.inventory + this.state.quantity}</span>
        <button onClick={this.handleIncrement} type="button">
          +
        </button>
        <button
          onClick={() => this.handleUpdateItem(updatedItem)}
          type="button"
        >
          Update
        </button>
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user
  }
}

export default connect(mapState)(SingleInventory)