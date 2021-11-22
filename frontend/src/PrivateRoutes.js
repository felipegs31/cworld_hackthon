import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Campaigns from './modules/campaigns/list/pages/Campaigns'
import CampaignDetail from './modules/campaigns/detail/pages/CampaignDetail'
import Users from './modules/users/list/pages/users'
import Lobby from './modules/lobby/pages/Lobby'
import Creators from './modules/creators/list/pages/Creators'
import { useContractKit, Alfajores, NetworkNames } from '@celo-tools/use-contractkit';
import { ContractKitProvider } from '@celo-tools/use-contractkit';
import '@celo-tools/use-contractkit/lib/styles.css';


const PrivateRoutes = () => {
  const { address, connect } = useContractKit()

  return (
    <>
      <button onClick={connect}>Click here to connect your wallet</button>
      <Switch>
        <Route path='/' exact component={Lobby} />
        <Route path='/company/campaigns' exact component={Campaigns} />
        <Route path='/company/campaigns/:id' exact component={CampaignDetail} />
        <Route path='/creators' exact component={Creators} />
        <Route path='/users' exact component={Users} />
        {/* <Route path='/:id' component={Restaurant} /> */}
      </Switch>
  </>
  )
}

function WrappedApp() {

  return (
    <ContractKitProvider
      networks={[Alfajores]}
      network={{
        name: NetworkNames.Alfajores,
        rpcUrl: 'https://alfajores-forno.celo-testnet.org',
        graphQl: 'https://alfajores-blockscout.celo-testnet.org/graphiql',
        explorer: 'https://alfajores-blockscout.celo-testnet.org',
        chainId: 44787,
      }}
      dapp={{
          name: "CWorld",
          description: "Creators World",
          url: "https://example.com",
        }}
    >
      <PrivateRoutes />
    </ContractKitProvider>
  );
}

export default WrappedApp
