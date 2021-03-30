import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Login from './modules/auth/pages/Login'
import Main from './modules/auth/pages/Main'

const PublicRoutes = () => {
  return (
    <Switch>
      <Route path='/login' exact component={Login} />
      <Route path='/' component={Main} />
    </Switch>
  )
}

export default PublicRoutes
