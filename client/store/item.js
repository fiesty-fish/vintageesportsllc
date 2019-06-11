import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_ITEMS = 'GET_ITEMS'

/**
 * INITIAL STATE
 */
const allItems = []

/**
 * ACTION CREATORS
 */
const getItemsCreator = items => ({type: GET_ITEMS, items})

/**
 * THUNK CREATORS
 */
export const getItemsThunk = () => async dispatch => {
  try {
    const {data} = await axios.get('/auth/items')
    dispatch(getItemsCreator(data))
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
    default:
      return state
  }
}
