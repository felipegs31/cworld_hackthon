import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Restaurants from './modules/restaurants/list/pages/Restaurants'
import Restaurant from './modules/restaurants/detail/pages/Restaurant'


const PrivateRoutes = () => {
  return (
    <Switch>
      <Route path='/' exact component={Restaurants} />
      <Route path='/:id' exact component={Restaurant} />
    </Switch>
  )
}

export default PrivateRoutes
