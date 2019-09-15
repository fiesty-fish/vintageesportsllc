import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import {me} from '../store'

/**
 * COMPONENT
 */
export class UserHome extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {firstName, email} = this.props

    return (
      <div>
        {email ? (
          <h3>
            Welcome back,{' '}
            {firstName ? firstName : email.slice(0, email.indexOf('@'))}.
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

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  firstName: PropTypes.string,
  email: PropTypes.string
}
