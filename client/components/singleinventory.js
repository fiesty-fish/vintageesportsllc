import React, {useState} from 'react'
import axios from 'axios'

export default function SingleInventory(props) {
  const [quantity, updateQuantity] = useState(0)

  async function handleUpdateInventory(item) {
    try {
      await axios.put(`/api/items/${props.user.id}`, {item})
    } catch (error) {
      console.error(error)
    }
  }

  function handleQuantity(event) {
    const totalInventory = props.item.inventory + quantity

    if (
      event.target.innerText === '+' &&
      quantity < 999 &&
      totalInventory < 1000
    ) {
      updateQuantity(quantity + 1)
    }

    if (
      event.target.innerText === '-' &&
      quantity >= -999 &&
      totalInventory > 0
    ) {
      updateQuantity(quantity - 1)
    }
  }

  const {item} = props

  const updatedItem = {
    name: item.name,
    inventory: quantity + item.inventory
  }

  return (
    <div>
      <h3>{`Item Name: ${item.name} (${item.year})`}</h3>
      <h5>Item Units Count: </h5>
      <button
        onClick={handleQuantity}
        type="button"
        className="nes-btn inc-dec-btn button-no-text-shadow"
      >
        -
      </button>
      <span> {item.inventory + quantity} </span>
      <button
        onClick={handleQuantity}
        type="button"
        className="nes-btn inc-dec-btn button-no-text-shadow"
      >
        +
      </button>
      <span> </span>
      <button
        onClick={() => {
          handleUpdateInventory(updatedItem)
        }}
        type="button"
        className="nes-btn is-primary"
      >
        Update
      </button>
    </div>
  )
}
