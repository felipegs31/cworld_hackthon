import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Campaigns from './modules/campaigns/list/pages/Campaigns'
import Restaurant from './modules/campaigns/detail/pages/Restaurant'
import CampaignDetails from './modules/campaigns/detail/pages/CampaignDetails'
import Users from './modules/users/list/pages/users'
import Lobby from './modules/lobby/pages/Lobby'



const PrivateRoutes = () => {
  return (
    <Switch>
      <Route path='/' exact component={Lobby} />
      <Route path='/company/campaigns' exact component={Campaigns} />
      <Route path='/company/campaigns/:id' exact component={CampaignDetails} />
      <Route path='/users' exact component={Users} />
      {/* <Route path='/:id' component={Restaurant} /> */}
    </Switch>
  )
}

export default PrivateRoutes
