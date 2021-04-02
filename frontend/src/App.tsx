import React from 'react';
import { Provider } from 'react-redux';

import PublicRoutes from './PublicRoutes';
import configureStore from './store';
import ReduxToastr from 'react-redux-toastr'

const initialState = (window as any).initialReduxState
const store = configureStore(initialState)


const App = () =>
<Provider store={store}>
  <PublicRoutes />
  <ReduxToastr
        timeOut={5000}
        newestOnTop={false}
        preventDuplicates
        position="top-right"
        transitionIn="fadeIn"
        transitionOut="fadeOut"
        progressBar
        closeOnToastrClick={false}/>
</Provider>;

export default App;
