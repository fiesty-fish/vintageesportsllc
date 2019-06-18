import React, {Component} from 'react'
import {connect} from 'react-redux'

import SingleItem from './singleitem'
import {getItemsThunk} from '../store/item'

class ItemList extends Component {
  componentDidMount() {
    this.props.loadAllItems()
  }

  render() {
    const {items} = this.props
    return (
      <div>
        <h3>See our nice selection of vintage vidya games!</h3>
        <div className="card-container">
          {items ? (
            items.map(item => {
              return (
                <div className="card-panel" key={item.id}>
                  <SingleItem item={item} />
                </div>
              )
            })
          ) : (
            <div>No items were found in inventory!</div>
          )}
        </div>
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
    loadAllItems() {
      dispatch(getItemsThunk())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default connect(mapState, mapDispatch)(ItemList)
