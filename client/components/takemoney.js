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
    console.log({token, addresses})
    const response = await axios.post('/api/orders/stripecheckout', {
      token,
      product: this.props.product
    })
    const {status} = response.data
    if (status === 'success') {
      console.log('TOAST WORKED!')
      toast('Success! Check emails for details', {type: 'success'})
    } else {
      toast('Something went wrong', {type: 'error'})
    }
  }

  render() {
    console.log(this.props.product, 'PROPSSSSS')
    return (
      <div>
        <ToastContainer />

        <StripeCheckout
          token={this.onToken}
          billingAddress
          shippingAddress
          amount={1000}
          name="Mario Kart"
          stripeKey="pk_test_JxsK9QIkocX2EOTbiyWnW8X600Sl7iKlaS"
        />
      </div>
    )
  }
}
