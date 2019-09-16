import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {NavLink as Link} from 'react-router-dom'

import {logout} from '../store'
import NavbarBurger from './navbar-burger'
import playSound from '../../script/utility-functions'

class Navbar extends Component {
  constructor() {
    super()
    this.state = {
      width: 0
    }
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
  }

  componentDidMount() {
    this.updateWindowDimensions()
    window.addEventListener('resize', this.updateWindowDimensions)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions)
  }

  updateWindowDimensions() {
    this.setState({width: window.innerWidth})
  }

  render() {
    const curWindowWidth = this.state.width
    console.log('curWindowWidth: ', curWindowWidth)
    const {handleClick, isLoggedIn, isAdmin, user} = this.props

    return (
      <React.Fragment>
        <nav className="flex-row-container-navbar">
          <div className="flex-containee-navbar">
            <Link
              to="/home"
              onClick={() => playSound('pipe')}
              style={{textDecoration: 'none'}}
            >
              {curWindowWidth > 1007 ? (
                <h3>Vintage Vidya Games</h3>
              ) : (
                <h3>
                  Vintage
                  <br />
                  Vidya
                  <br />
                  Games
                </h3>
              )}
            </Link>
          </div>

          {curWindowWidth > 1007 ? (
            <div className="flex-containee-navbar">
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
                    to="orders"
                    className="nes-btn is-warning"
                    onClick={() => playSound('jump')}
                  >
                    Orders
                  </Link>

                  {user.googleId ? null : (
                    <Link
                      to="profile"
                      className="nes-btn is-warning"
                      onClick={() => playSound('jump')}
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
                    onClick={() => playSound('jump')}
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
                  {/* The navbar will show these links before you login */}
                  <Link
                    to="/login"
                    className="nes-btn is-warning"
                    onClick={() => playSound('jump')}
                  >
                    Login
                  </Link>

                  <Link
                    to="/signup"
                    className="nes-btn is-warning"
                    onClick={() => playSound('jump')}
                  >
                    Sign Up
                  </Link>
                </React.Fragment>
              )}
            </div>
          ) : (
            <NavbarBurger props={this.props} />
          )}
        </nav>

        <br />

        <progress
          className="nes-progress is-success"
          value="0"
          max="100"
          style={{height: '0.5vh'}}
        />

        <br />
        <br />
      </React.Fragment>
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
