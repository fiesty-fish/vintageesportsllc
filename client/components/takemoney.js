import React from 'react'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'
import {ToastContainer, toast} from 'react-toastify'

export default class TakeMoney extends React.Component {
  constructor() {
    super()
    this.onToken = this.onToken.bind(this)
  }

  async onToken(token, addresses) {
    const response = await axios.post('/api/orders/stripecheckout', {
      token,
      product: this.props.product
    })
    const {status} = response.data
    if (status === 'success') {
      this.props.handleCheckout()
      toast('Your order was placed successfully.', {type: 'success'})
    } else {
      toast('Something went wrong', {type: 'error'})
    }
  }

  render() {
    return (
      <div>
        <ToastContainer />
        <StripeCheckout
          token={this.onToken}
          billingAddress
          shippingAddress
          amount={this.props.total}
          name="Your Vintage Order"
          stripeKey="pk_test_JxsK9QIkocX2EOTbiyWnW8X600Sl7iKlaS"
        />
      </div>
    )
  }
}
