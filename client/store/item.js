import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_ITEMS = 'GET_ITEMS'
const GET_ADMIN_ITEMS = 'GET_ADMIN_ITEMS'

/**
 * INITIAL STATE
 */
const allItems = []

/**
 * ACTION CREATORS
 */
const getItemsCreator = items => ({type: GET_ITEMS, items})
const getAdminItemsCreator = adminId => ({type: GET_ADMIN_ITEMS, adminId})

/**
 * THUNK CREATORS
 */
export const getItemsThunk = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/items')
    dispatch(getItemsCreator(data))
  } catch (err) {
    console.error(err)
  }
}

// thunk for getting items for admin
export const getAdminItemsThunk = adminId => async dispatch => {
  try {
    const adminItems = await axios.get(`/api/items/${adminId}`)
    dispatch(getAdminItemsCreator(adminItems.data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = allItems, action) {
  switch (action.type) {
    case GET_ITEMS:
      return action.items
    case GET_ADMIN_ITEMS:
      return state.filter(item => item.userId === action.adminId)
    default:
      return state
  }
}
