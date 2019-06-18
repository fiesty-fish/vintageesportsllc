import React, {Component} from 'react'
import {connect} from 'react-redux'

class SingleOrder extends Component {
  render() {
    const {order, items} = this.props

    return (
      <div>
        <h3>Date: {order[0].slice(0, 10)}</h3>
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
                <div key={currItem.itemId}>
                  <h4>{currItemName}</h4>
                  <ul>
                    <li>Quantity: {currItem.quantity}</li>
                    <li>
                      Price: ${' '}
                      {(currItem.price * currItem.quantity / 100).toFixed(2)}
                    </li>
                    <li>
                      Single Item Price: $ {(currItem.price / 100).toFixed(2)}
                    </li>
                  </ul>
                </div>
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
