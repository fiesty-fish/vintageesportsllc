import React, {Component} from 'react'
import axios from 'axios'
import SingleInventory from './singleinventory'

export default class Inventory extends Component {
  constructor() {
    super()
    this.state = {
      items: [],
      user: {}
    }
  }

  async componentDidMount() {
    try {
      const [items, user] = await Promise.all([
        axios.get('/api/items'),
        axios.get('/auth/me')
      ])

      this.setState({
        items: items.data,
        user: user.data
      })
    } catch (error) {
      console.error(error)
    }
  }

  async handleRemoveItem(itemId) {
    try {
      await axios.put(`/api/items/remove/${this.state.user.id}`, {itemId})
      this.setState(prevState => {
        const newItems = prevState.items.filter(item => item.id !== itemId)
        return {items: newItems}
      })
    } catch (error) {
      console.error(error)
    }
  }

  render() {
    return (
      <div className="inventory-list">
        <h3>Current store inventory:</h3>
        <br />
        {this.state.items.map(item => {
          return (
            <div key={item.id}>
              <SingleInventory item={item} user={this.state.user} />
              <br />
              <button
                onClick={() => this.handleRemoveItem(item.id)}
                type="button"
                className="nes-btn is-error"
              >
                Remove Item
              </button>
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
        })}
      </div>
    )
  }
}
