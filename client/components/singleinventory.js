import React, {Component} from 'react'
// import {connect} from 'react-redux'
// import axios from 'axios'

export default class SingleInventory extends Component {
  constructor() {
    super()
    this.state = {
      quantity: 0
    }
    // this.handleUpdateItem = this.handleUpdateItem.bind(this)
    this.handleIncrement = this.handleIncrement.bind(this)
    this.handleDecrement = this.handleDecrement.bind(this)
  }

  handleIncrement() {
    const currQuantity = this.state.quantity
    if (currQuantity < 999) {
      this.setState({
        quantity: currQuantity + 1
      })
    }
  }

  handleDecrement() {
    const currQuantity = this.state.quantity
    if (currQuantity >= -999) {
      this.setState({
        quantity: currQuantity - 1
      })
    }
  }

  render() {
    const {item} = this.props

    return (
      <div>
        <h3>{`Name: ${item.name}`}</h3>
        <h5>Inventory: </h5>
        <button onClick={this.handleIncrement} type="button">
          +
        </button>
        <span>{item.inventory + this.state.quantity}</span>
        <button onClick={this.handleDecrement} type="button">
          -
        </button>
      </div>
    )
  }
}
