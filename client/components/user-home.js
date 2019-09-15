import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {firstName, email} = props

  return (
    <div>
      {email ? (
        <h3>
          Welcome, {firstName ? firstName : email.slice(0, email.indexOf('@'))}.
        </h3>
      ) : (
        <div>
          <h3>Hello, guest. Be sure to login or sign up.</h3>
        </div>
      )}

      <br />

      <progress
        className="nes-progress is-success"
        value="0"
        max="100"
        style={{height: '0.5vh'}}
      />

      <br />
      <br />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    firstName: state.user.firstName,
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  firstName: PropTypes.string,
  email: PropTypes.string
}
