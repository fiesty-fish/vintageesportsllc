import React, {Component} from 'react'
import {connect} from 'react-redux'

import SingleOrder from './singleorder'
import {me} from '../store/user'
import {getItemsThunk} from '../store/item'
import {getClosedOrdersThunkCreator} from '../store/order'

class OrdersList extends Component {
  componentDidMount() {
    this.props.loadAllItems()
  }

  render() {
    if (this.props.user.id && !this.props.orders.length) {
      this.props.loadAllOrders(this.props.user.id)
    }

    let curUserClosedOrdersByOrderId
    if (this.props.orders === 'NO CLOSED ORDER FOUND') {
      curUserClosedOrdersByOrderId = null
    } else {
      try {
        curUserClosedOrdersByOrderId = this.props.orders.reduce(
          (acc, curOrder) => {
            acc[curOrder.orderId] = acc[curOrder.orderId] || [
              curOrder.updatedAt
            ]
            acc[curOrder.orderId].push(curOrder)
            return acc
          },
          []
        )
      } catch (error) {
        curUserClosedOrdersByOrderId = null
      }
    }

    return (
      <div>
        <h3>This is a list of your past orders:</h3>
        <br />
        <div>
          {curUserClosedOrdersByOrderId ? (
            curUserClosedOrdersByOrderId.map((curOrder, idx) => {
              return (
                <div key={idx}>
                  <SingleOrder order={curOrder} items={this.props.items} />
                  <br />
                  <hr />
                  <br />
                </div>
              )
            })
          ) : (
            <div>No past orders were found!</div>
          )}
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user,
    orders: state.order,
    items: state.item
  }
}

const mapDispatch = dispatch => {
  return {
    loadUserData() {
      dispatch(me())
    },
    loadAllOrders(userId) {
      dispatch(getClosedOrdersThunkCreator(userId))
    },
    loadAllItems() {
      dispatch(getItemsThunk())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default connect(mapState, mapDispatch)(OrdersList)
