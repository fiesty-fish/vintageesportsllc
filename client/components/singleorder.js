import React, {Component} from 'react'
import {connect} from 'react-redux'
// import axios from 'axios'

class SingleOrder extends Component {
  render() {
    const {order, items} = this.props
    console.log('ITEMS ---->', items)

    return (
      <div>
        <div>Date: {order[0]}</div>
        <div>
          {order.map(currItem => {
            // const currItemName = items.filter(
            //   item => item.id === currItem.itemId
            // )[0]
            const currItemName = items.reduce((accum, item) => {
              if (item.id === currItem.itemId) {
                accum = item.name
              }
              return accum
            }, '')
            // const currItemName = currItemObj.name
            console.log('CURR ITEMNAME', currItemName)
            return (
              <li key={currItem.itemId}>
                Name:
                {currItemName}
              </li>
            )
          })}
        </div>
        {/* // <li>Name: {items.name}</li> */}
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user
  }
}

export default connect(mapState)(SingleOrder)
