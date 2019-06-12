import React from 'react'
import {Navbar, ItemList, CartView} from './components'
import {Route, Switch} from 'react-router-dom'
import Routes from './routes'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
      <Switch>
        <Route path="/cart" component={CartView} />
        <Route path="/" component={ItemList} />
      </Switch>
    </div>
  )
}

export default App
