import React from 'react'
import {Navbar, ItemList, CartView, ProfileView, Inventory} from './components'
import {Route, Switch} from 'react-router-dom'
import Routes from './routes'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
      <Switch>
        <Route path="/cart" component={CartView} />
        <Route path="/profile" component={ProfileView} />
        <Route path="/inventory" component={Inventory} />
        {/* orders component */}
        <Route path="/" component={ItemList} />
      </Switch>
    </div>
  )
}

export default App
