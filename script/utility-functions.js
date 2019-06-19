import axios from 'axios'

const utilsFuncs = {
  playSound(soundIdStr) {
    document.getElementById(soundIdStr).play()
  },
  async handleCart(user) {
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
}

export default utilsFuncs
