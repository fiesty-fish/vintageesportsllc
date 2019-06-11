import React from 'react'
import {Navbar, ItemList} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
      <ItemList />
    </div>
  )
}

export default App
