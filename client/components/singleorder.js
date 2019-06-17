import React, {Component} from 'react'
import {connect} from 'react-redux'
// import axios from 'axios'

class SingleOrder extends Component {
  render() {
    const {order} = this.props
    return (
      <div>
        <div>Date: {order[0]}</div>
        <li>Name: {order[1].name}</li>
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
