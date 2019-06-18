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
        <div>
          {items ? (
            items.map(item => {
              return (
                <div key={item.id}>
                  <SingleItem item={item} />
                  <hr />
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
