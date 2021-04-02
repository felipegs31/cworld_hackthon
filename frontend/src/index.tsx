import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import history from './History'
import { Router } from 'react-router-dom'
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'

ReactDOM.render(
<Router history={history}>
  <App />
</Router>, document.getElementById('root'));
