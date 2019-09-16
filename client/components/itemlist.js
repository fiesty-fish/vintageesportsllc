import React, {Component} from 'react'
import {connect} from 'react-redux'

import SingleItem from './singleitem'
import {getItemsThunk} from '../store/item'

class ItemList extends Component {
  constructor() {
    super()
    this.state = {
      width: 0
    }
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
  }

  componentDidMount() {
    this.props.loadAllItems()
    this.updateWindowDimensions()
    window.addEventListener('resize', this.updateWindowDimensions)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions)
  }

  updateWindowDimensions() {
    this.setState({width: window.innerWidth})
  }

  render() {
    const curWindowWidth = this.state.width
    const {items} = this.props

    return (
      <div className="all-items-header">
        <h4>Check out our nice selection of vintage vidya games:</h4>

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
