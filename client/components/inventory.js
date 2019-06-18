import React, {Component} from 'react'
import {connect} from 'react-redux'
// import axios from 'axios'
import {getItemsThunk} from '../store/index'
import SingleInventory from './singleinventory'

class Inventory extends Component {
  componentDidMount() {
    this.props.loadInventory()
  }

  render() {
    const {items} = this.props

    return (
      <div>
        <h3>Inventory</h3>
        {items.map(item => {
          return <SingleInventory key={item.id} item={item} />
        })}
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
