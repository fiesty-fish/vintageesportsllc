import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {NavLink as Link} from 'react-router-dom'
import {logout} from '../store'
import playSound from '../../script/utility-functions'

const Navbar = ({handleClick, isLoggedIn, isAdmin, user}) => (
  <React.Fragment>
    <h1>Vintage Vidya Games!</h1>

    <nav>
      <Link
        to="/home"
        className="nes-btn is-warning"
        onClick={() => playSound('jump')}
      >
        Home
      </Link>
      <Link
        to="/cart"
        className="nes-btn is-warning"
        onClick={() => playSound('jump')}
      >
        Cart
      </Link>

      {/* show link to profile after logged in */}

      {isLoggedIn && (
        // React.Fragment wraps the child elements but does not add another dom element

        <React.Fragment>
          <Link
            to="profile"
            className="nes-btn is-warning"
            onClick={() => playSound('jump')}
          >
            Profile
          </Link>

          <Link
            to="orders"
            className="nes-btn is-warning"
            onClick={() => playSound('jump')}
          >
            Orders
          </Link>
        </React.Fragment>
      )}

      {isAdmin && (
        <React.Fragment>
          <Link
            to="inventory"
            className="nes-btn is-warning"
            onClick={() => playSound('jump')}
          >
            Inventory
          </Link>
        </React.Fragment>
      )}

      {isLoggedIn ? (
        <React.Fragment>
          {/* The navbar will show these links after you log in */}

          <Link
            to="#"
            className="nes-btn is-warning"
            onClick={() => {
              handleClick()
              playSound('death')
            }}
          >
            Logout
          </Link>
        </React.Fragment>
      ) : (
        <React.Fragment>
          {/* The navbar will show these links before you log in */}

          <Link
            to="/login"
            className="nes-btn is-warning"
            onClick={() => playSound('lvlup')}
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="nes-btn is-warning"
            onClick={() => playSound('lvlup')}
          >
            Sign Up
          </Link>
        </React.Fragment>
      )}
    </nav>

    <hr />
  </React.Fragment>
)

/**

 * CONTAINER

 */

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,

    isAdmin: !!state.user.admin,

    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())

      localStorage.clear()
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**

 * PROP TYPES

 */

Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,

  isLoggedIn: PropTypes.bool.isRequired,

  isAdmin: PropTypes.bool.isRequired,

  user: PropTypes.object.isRequired
}
