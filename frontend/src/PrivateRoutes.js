import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Campaigns from './modules/campaigns/list/pages/Campaigns'
import CampaignDetail from './modules/campaigns/detail/pages/CampaignDetail'
import Users from './modules/users/list/pages/users'
import Lobby from './modules/lobby/pages/Lobby'
import Creators from './modules/creators/list/pages/Creators'



const PrivateRoutes = () => {
  return (
    <Switch>
      <Route path='/' exact component={Lobby} />
      <Route path='/company/campaigns' exact component={Campaigns} />
      <Route path='/company/campaigns/:id' exact component={CampaignDetail} />
      <Route path='/creators' exact component={Creators} />
      <Route path='/users' exact component={Users} />
      {/* <Route path='/:id' component={Restaurant} /> */}
    </Switch>
  )
}

export default PrivateRoutes
