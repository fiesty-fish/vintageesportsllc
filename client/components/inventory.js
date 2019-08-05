import React, {Component} from 'react'
import {connect} from 'react-redux'
// import axios from 'axios'
import {getItemsThunk} from '../store/index'
import SingleInventory from './singleinventory'
import {O_TRUNC} from 'constants'

class Inventory extends Component {
  componentDidMount() {
    this.props.loadInventory()
  }

  render() {
    const {items} = this.props

    return (
      <div>
        <h3>This is our store inventory:</h3>
        <br />
        {items.map(item => {
          return (
            <div key={item.id}>
              <SingleInventory item={item} />
              <br />
            </div>
          )
        })}
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user,
    items: state.item
  }
}

const mapDispatch = dispatch => {
  return {
    loadInventory() {
      dispatch(getItemsThunk())
    }
  }
}

export default connect(mapState, mapDispatch)(Inventory)
