import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {NavLink as Link} from 'react-router-dom'
import {slide as Menu} from 'react-burger-menu'

import {logout} from '../store'
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
          width="44%"
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

const burgerStyles = {
  /* Position and sizing of burger button */
  bmBurgerButton: {
    position: 'fixed',
    width: '36px',
    height: '30px',
    right: '17.5px',
    top: '17.5px'
  },

  /* Color/shape of burger icon bars */
  bmBurgerBars: {
    background: '#f7d51d'
  },

  /* Color/shape of burger icon bars on hover*/
  bmBurgerBarsHover: {
    background: '#a90000'
  },

  /* Position and sizing of clickable cross button */
  bmCrossButton: {
    height: '24px',
    width: '24px',
    backgroundColor: '#424242'
  },

  /* Color/shape of close button cross */
  bmCross: {
    background: '#bdc3c7'
  },

  /*
  Sidebar wrapper styles
  Note: Beware of modifying this element as it can break the animations - you should not need to touch it in most cases
  */
  bmMenuWrap: {
    height: '100%',
    top: '0px'
  },

  /* General sidebar styles */
  bmMenu: {
    background: '#92cc41',
    // padding: '2.5em 1.5em 0',
    fontSize: '0.65em'
  },

  /* Morph shape necessary with bubble or elastic */
  bmMorphShape: {
    fill: '#373a47'
  },

  /* Wrapper for item list */
  bmItemList: {
    color: '#b8b7ad',
    backgroundColor: '#92cc41',
    padding: '1em'
  },

  /* Individual item */
  bmItem: {
    display: 'inline-block'
  },

  /* Styling of overlay */
  bmOverlay: {
    top: '0px',
    right: '0px',
    background: 'rgba(0, 0, 0, 0.3)'
  }
}

const divStyles = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center'
}

const linkStyles = {
  flex: 1,
  alignSelf: 'flex-start'
}
