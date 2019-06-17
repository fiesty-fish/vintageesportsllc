import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_CLOSED_ORDERS = 'GET_CLOSED_ORDERS'

/**
 * INITIAL STATE
 */
const allClosedOrders = []

/**
 * ACTION CREATORS
 */
const getClosedOrdersActionCreator = orders => ({
  type: GET_CLOSED_ORDERS,
  orders
})

/**
 * THUNK CREATORS
 */
export const getClosedOrdersThunkCreator = userId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/orders/past/${userId}`)
    console.log('ordersData: ', data)
    dispatch(getClosedOrdersActionCreator(data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = allClosedOrders, action) {
  switch (action.type) {
    case GET_CLOSED_ORDERS:
      console.log('action.orders: ', action.orders)
      return action.orders
    default:
      return state
  }
}
