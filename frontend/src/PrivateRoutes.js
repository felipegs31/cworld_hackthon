import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Restaurants from './modules/restaurants/list/pages/Restaurants'
import Restaurant from './modules/restaurants/detail/pages/Restaurant'
import Users from './modules/users/list/pages/users'



const PrivateRoutes = () => {
  return (
    <Switch>
      <Route path='/' exact component={Restaurants} />
      <Route path='/users' exact component={Users} />
      <Route path='/:id' component={Restaurant} />
    </Switch>
  )
}

export default PrivateRoutes
