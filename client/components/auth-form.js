import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import axios from 'axios'

import {auth} from '../store'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div>
      <div>
        <h3>Hello, guest. Be sure to login or sign up.</h3>
      </div>
      <form onSubmit={handleSubmit} name={name} className="nes-field">
        <div>
          <label htmlFor="email">
            <small>Email:</small>
          </label>
          <input name="email" type="text" className="nes-input input" />
          <label htmlFor="password">
            <small>Password:</small>
          </label>
          <input name="password" type="password" className="nes-input input" />
          <div className="login-btn-space">
            <button type="submit" className="nes-btn is-success">
              {displayName}
            </button>
            <a href="/auth/google" className="nes-btn is-primary">
              {displayName} with Google
            </a>
          </div>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
      <progress
        className="nes-progress is-success"
        value="0"
        max="100"
        style={{height: '50%'}}
      />
      <br />
      <br />
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    async handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      const curLoggedInUserId = await dispatch(auth(email, password, formName))
      const userObj = {id: curLoggedInUserId}
      async function handleCart(user) {
        // if there is a user logged in
        if (user.id) {
          // retrieve an open order for logged in user by user id
          const {data} = await axios.get(`/api/orders/${user.id}`)
          // if the user has an open order with items in it
          if (data.length) {
            // if the user had items in their localStorage cart as a guest
            if (localStorage.cart) {
              // make the cart object accessible
              const curCart = JSON.parse(localStorage.cart)
              // for each item in the data retrieved
              data.forEach(async curItem => {
                // if localStorage cart has that specific item
                if (curCart[curItem.itemId]) {
                  // if localStorage specific item quantity is NOT equal to specific curItem quantity
                  if (curCart[curItem.itemId] !== curItem.quantity) {
                    // capture guest cart specific item quantity
                    const curGuestCartQuantity = curCart[curItem.itemId]
                    // set guest cart specific item quantity to be the sum of the guest quantity and the quantity from the database
                    curCart[curItem.itemId] =
                      curCart[curItem.itemId] + curItem.quantity
                    // update that specific item on the backend with the new total quantity
                    const updateCurItemQuantity = await axios.put(
                      `/api/orders/edit/${user.id}`,
                      {
                        item: {
                          id: curItem.itemId,
                          price: curItem.price,
                          quantity: curGuestCartQuantity
                        }
                      }
                    )
                  }
                } else {
                  // if localStorage cart DOES NOT have that specific item, add the item to the localStorage cart and set it's quantity to the quantity in the database
                  curCart[curItem.itemId] = curItem.quantity
                }
              })
              // set the localStorage cart to the updated cart object
              localStorage.clear()
              localStorage.setItem('cart', JSON.stringify(curCart))
            } else {
              // if the user DID NOT have items in their localStorage cart as a guest, reduce the items in the open order in the backend into an object
              let retrievedCart
              if (Array.isArray(data)) {
                retrievedCart = data.reduce((acc, curItem) => {
                  acc[curItem.itemId] = curItem.quantity
                  return acc
                }, {})
              } else {
                retrievedCart = {}
              }
              // set the localStorage cart to the newly created cart object
              localStorage.setItem('cart', JSON.stringify(retrievedCart))
            }
          }
        }
      }
      handleCart(userObj)
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
