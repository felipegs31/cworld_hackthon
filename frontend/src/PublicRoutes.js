import React from 'react'
import { Route, Switch } from 'react-router-dom'
import CreateAccount from './modules/auth/pages/CreateAccount'
import InviteUser from './modules/auth/pages/InviteUser'
import Login from './modules/auth/pages/Login'
import Main from './modules/auth/pages/Main'
import ResetPassword from './modules/auth/pages/ResetPassword'
import ResetPasswordConfirmation from './modules/auth/pages/ResetPasswordConfirmation'

const PublicRoutes = () => {
  return (
    <Switch>
      <Route path='/login' exact component={Login} />
      <Route path="/resetpassword" exact component={ResetPassword} />
      <Route path="/resetpassword/:id" exact component={ResetPasswordConfirmation} />
      <Route path="/createaccount" exact component={CreateAccount} />
      <Route path="/inviteuser/:id" exact component={InviteUser} />
      <Route path='/' component={Main} />
    </Switch>
  )
}

export default PublicRoutes
