import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {firstName, email} = props

  return (
    <div>
      <h3>
        Welcome, {firstName ? firstName : email.slice(0, email.indexOf('@'))}.
      </h3>
      <br />
      <progress className="nes-progress is-success" value="100" max="100" />
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
