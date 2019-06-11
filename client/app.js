import React from 'react'
import {Navbar, ItemList, CartView} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
      <hr />
      <ItemList />
      <hr />
      <CartView />
    </div>
  )
}

export default App
