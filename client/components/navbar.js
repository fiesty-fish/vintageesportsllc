import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import axios from 'axios'

const Navbar = ({handleClick, isLoggedIn, handleCart, user}) => (
  <div>
    <h1>Vintage Vidya Games!</h1>
    <nav>
      <Link to="/home">Home</Link>
      <Link to="/cart" onClick={() => handleCart(user)}>
        Cart
      </Link>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      )}
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
      localStorage.clear()
    },
    async handleCart(user) {
      if (user.id) {
        const {data} = await axios.get(`/api/orders/${user.id}`)
        if (data.length) {
          if (localStorage.cart) {
            const curCart = JSON.parse(localStorage.cart)
            data.forEach(async curItem => {
              if (curCart[curItem.itemId]) {
                if (curCart[curItem.itemId] !== curItem.quantity) {
                  const curGuestCartQuantity = curCart[curItem.itemId]
                  curCart[curItem.itemId] =
                    curCart[curItem.itemId] + curItem.quantity
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
                curCart[curItem.itemId] = curItem.quantity
              }
            })
            localStorage.setItem('cart', JSON.stringify(curCart))
          } else {
            const retrievedCart = data.reduce((acc, curItem) => {
              acc[curItem.itemId] = curItem.quantity
              return acc
            }, {})
            localStorage.setItem('cart', JSON.stringify(retrievedCart))
          }
        }
      }
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
  handleCart: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}
