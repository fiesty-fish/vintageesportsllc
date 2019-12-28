import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {NavLink as Link} from 'react-router-dom'
import {slide as Menu} from 'react-burger-menu'

import {logout} from '../store'
import {burgerStyles, divStyles, linkStyles} from '../../public/styles'
import playSound from '../../script/utility-functions'

class NavbarBurger extends Component {
  constructor() {
    super()
    this.state = {
      menuOpen: false
    }
    this.handleStateChange = this.handleStateChange.bind(this)
    this.closeMenu = this.closeMenu.bind(this)
  }

  handleStateChange(state) {
    this.setState({menuOpen: state.isOpen})
  }

  closeMenu() {
    this.setState({menuOpen: false})
  }

  render() {
    const {handleClick, isLoggedIn, isAdmin, user} = this.props

    return (
      <div>
        <Menu
          isOpen={this.state.menuOpen}
          onStateChange={state => this.handleStateChange(state)}
          right
          width="50%"
          styles={burgerStyles}
        >
          <div style={divStyles}>
            <Link
              to="/home"
              className="nes-btn is-warning"
              style={linkStyles}
              onClick={() => {
                playSound('jump')
                this.closeMenu()
              }}
            >
              Home
            </Link>

            <Link
              to="/cart"
              className="nes-btn is-warning"
              style={linkStyles}
              onClick={() => {
                playSound('jump')
                this.closeMenu()
              }}
            >
              Cart
            </Link>

            {/* show link to profile after logged in */}
            {isLoggedIn && (
              // React.Fragment wraps the child elements but does not add another dom element
              <React.Fragment>
                <Link
                  to="orders"
                  className="nes-btn is-warning"
                  style={linkStyles}
                  onClick={() => {
                    playSound('jump')
                    this.closeMenu()
                  }}
                >
                  Orders
                </Link>

                {user.googleId ? null : (
                  <Link
                    to="profile"
                    className="nes-btn is-warning"
                    style={linkStyles}
                    onClick={() => {
                      playSound('jump')
                      this.closeMenu()
                    }}
                  >
                    Profile
                  </Link>
                )}
              </React.Fragment>
            )}

            {isAdmin && (
              <React.Fragment>
                <Link
                  to="inventory"
                  className="nes-btn is-warning"
                  style={linkStyles}
                  onClick={() => {
                    playSound('jump')
                    this.closeMenu()
                  }}
                >
                  Inventory
                </Link>
              </React.Fragment>
            )}

            {isLoggedIn ? (
              <React.Fragment>
                {/* The navbar will show these links after you login */}
                <Link
                  to="#"
                  className="nes-btn is-warning"
                  style={linkStyles}
                  onClick={() => {
                    handleClick()
                    playSound('death')
                    this.closeMenu()
                  }}
                >
                  Logout
                </Link>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {/* The navbar will show these links before you login */}
                <Link
                  to="/login"
                  className="nes-btn is-warning"
                  style={linkStyles}
                  onClick={() => {
                    playSound('jump')
                    this.closeMenu()
                  }}
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  className="nes-btn is-warning"
                  style={linkStyles}
                  onClick={() => {
                    playSound('jump')
                    this.closeMenu()
                  }}
                >
                  Sign Up
                </Link>
              </React.Fragment>
            )}
          </div>
        </Menu>
      </div>
    )
  }
}

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
      // clear cart on log out
      localStorage.clear()
    }
  }
}

export default connect(mapState, mapDispatch)(NavbarBurger)

/**
 * PROP TYPES
 */

NavbarBurger.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired
}
