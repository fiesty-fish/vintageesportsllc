import React, {Component} from 'react'
import {connect} from 'react-redux'
import SingleOrder from './singleorder'
import {me} from '../store/user'
import {getClosedOrdersThunkCreator} from '../store/order'
import axios from 'axios'

class OrdersList extends Component {
  // async componentDidMount() {
  //   console.log('userId: ', this.props.user.id)
  //   const check = await this.props.loadUserData()
  //   console.log('check: ', check)
  //   console.log('userId: ', this.props.user.id)
  //   await this.props.loadAllOrders(this.props.user.id)
  // }

  render() {
    let curUserClosedOrdersByOrderId
    console.log('props in the render: ', this.props)
    if (this.props.user.id) {
      console.log('userId: ', this.props.user.id)
      const checkReducer = this.props.loadAllOrders(this.props.user.id)
      console.log('checkReducer: ', checkReducer)
    }
    if (this.props.orders) {
      if (this.props.orders[1]) {
        console.log('IN THE IF')
        curUserClosedOrdersByOrderId = this.props.orders.reduce(
          (acc, curOrder) => {
            console.log('desired key: ', curOrder.orderId)
            acc[curOrder.orderId] = acc[curOrder.orderId] || [
              curOrder.updatedAt
            ]
            acc[curOrder.orderId].push(curOrder)
            return acc
          },
          {}
        )
      }
    }
    console.log('curUserClosedOrdersByOrderId: ', curUserClosedOrdersByOrderId)

    let arrayedOrders = []
    // if(curUserClosedOrdersByOrderId) {
    //   for(let key in curUSerClosedOrdersByOrderId) {
    //     arrayedOrders[key] =
    //   }
    // }

    // :

    console.log('arrayedOrders: ', arrayedOrders)

    return (
      <div>
        <h3>Here is a list of your past orders:</h3>
        <ul>
          {curUserClosedOrdersByOrderId ? (
            arrayedOrders.map(curOrder => {
              return <SingleOrder key={curOrder.id} order={curOrder} />
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
    orders: state.order
  }
}

const mapDispatch = dispatch => {
  return {
    loadUserData() {
      dispatch(me())
    },
    loadAllOrders(userId) {
      dispatch(getClosedOrdersThunkCreator(userId))
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default connect(mapState, mapDispatch)(OrdersList)
