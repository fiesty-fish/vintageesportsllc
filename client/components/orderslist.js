import React, {Component} from 'react'
import {connect} from 'react-redux'
import SingleOrder from './singleorder'
import {me} from '../store/user'
import {getClosedOrdersThunkCreator} from '../store/order'
import {getItemsThunk} from '../store/item'

class OrdersList extends Component {
  componentDidMount() {
    this.props.loadAllItems()
  }

  render() {
    let curUserClosedOrdersByOrderId

    if (this.props.user.id && !this.props.orders.length) {
      const checkReducer = this.props.loadAllOrders(this.props.user.id)
    }
    if (this.props.orders) {
      if (this.props.orders[1]) {
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
      }
    }

    return (
      <div>
        <h3>Here is a list of your past orders:</h3>
        <ul>
          {curUserClosedOrdersByOrderId ? (
            curUserClosedOrdersByOrderId.map((curOrder, idx) => {
              return (
                <SingleOrder
                  key={idx}
                  order={curOrder}
                  items={this.props.items}
                />
              )
            })
          ) : (
            <div>No past orders were found!</div>
          )}
        </ul>
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
