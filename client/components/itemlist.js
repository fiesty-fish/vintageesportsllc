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
    const curWindowWidth = document.body.offsetWidth

    return (
      <div className="all-items-header">
        <h3>Check out our nice selection of vintage vidya games:</h3>
        <br />
        <div
          className={
            curWindowWidth > 1007 ? 'card-container' : 'flex-column-container'
          }
        >
          {items ? (
            items.map(item => {
              return (
                <div
                  className={
                    curWindowWidth > 1007
                      ? 'card-panel flex-column-container'
                      : 'card-panel-mobile flex-column-container'
                  }
                  key={item.id}
                >
                  <SingleItem item={item} />
                </div>
              )
            })
          ) : (
            <div>No items were found in inventory.</div>
          )}
        </div>
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
    loadAllItems() {
      dispatch(getItemsThunk())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default connect(mapState, mapDispatch)(ItemList)
