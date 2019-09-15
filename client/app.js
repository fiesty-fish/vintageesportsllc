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
import Footer from './components/footer'

const App = () => {
  return (
    <div>
      <Navbar />

      <Routes />

      <Switch>
        <Route path="/cart" component={CartView} />
        <Route path="/orders" component={OrdersList} />
        <Route path="/profile" component={ProfileView} />
        <Route path="/inventory" component={Inventory} />
        {/* <Route path="/login" component={Routes} />
        <Route path="/signup" component={Routes} /> */}
        <Route path="/" component={ItemList} />
      </Switch>
      <Footer />
    </div>
  )
}

export default App
