import React from 'react'
import {
  Navbar,
  ItemList,
  CartView,
  ProfileView,
  OrdersList,
  Inventory
} from './components'
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
        <Route path="/orders" component={OrdersList} />
        <Route path="/inventory" component={Inventory} />
        <Route path="/" component={ItemList} />
      </Switch>
    </div>
  )
}

export default App
