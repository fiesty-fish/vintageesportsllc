import React, {Component} from 'react'
import {connect} from 'react-redux'

class SingleOrder extends Component {
  render() {
    const {order, items} = this.props

    return (
      <div>
        <div>Date: {order[0].slice(0, 9)}</div>
        <div>
          {order.map((currItem, idx) => {
            if (idx !== 0) {
              const currItemName = items.reduce((accum, item) => {
                if (item.id === currItem.itemId) {
                  accum = item.name
                }
                return accum
              }, '')

              return (
                <li key={currItem.itemId}>
                  Name:
                  {currItemName}, Quantity: {currItem.quantity}, Price: ${' '}
                  {(currItem.price * currItem.quantity / 100).toFixed(2)},
                  Single Item Price: $ {(currItem.price / 100).toFixed(2)}
                </li>
              )
            }
          })}
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user
  }
}

export default connect(mapState)(SingleOrder)
