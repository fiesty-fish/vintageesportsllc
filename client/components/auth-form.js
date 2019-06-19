import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import axios from 'axios'
import {auth} from '../store'
import {playSound, handleCart} from '../../script/utility-functions'
import {NavLink} from 'react-router-dom'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div>
      <div>
        <h3>Hello Guest! Be sure to sign up or log in!</h3>
      </div>
      <form onSubmit={handleSubmit} name={name} className="nes-field">
        <div>
          <label htmlFor="email">
            <small>Email</small>
          </label>
          <input name="email" type="text" className="nes-input input" />
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" className="nes-input input" />
          <div className="login-btn-space">
            <button type="submit" className="nes-btn is-primary">
              {displayName}
            </button>
            <a href="/auth/google" className="nes-btn is-success">
              {displayName} with Google
            </a>
          </div>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>

      <hr />
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
