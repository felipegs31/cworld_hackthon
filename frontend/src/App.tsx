import React from 'react';
import { Provider } from 'react-redux';

import PublicRoutes from './PublicRoutes';
import configureStore from './store';

const initialState = (window as any).initialReduxState
const store = configureStore(initialState)


const App = () => <Provider store={store}>
  <PublicRoutes />
</Provider>;

export default App;
