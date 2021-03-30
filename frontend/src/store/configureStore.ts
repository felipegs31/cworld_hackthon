import { IApplicationState } from './roots/rootReducer';
import { createStore, applyMiddleware, Store, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './roots/rootReducer';
import rootSaga from './roots/rootSaga';

const sagaMiddleware = createSagaMiddleware();


export default function configureStore (
	initialState: IApplicationState
): Store<IApplicationState> {
  const composeEnhancers = process.env.NODE_ENV === 'development' ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose
  const middlewares = applyMiddleware(sagaMiddleware) // Create Store

	const store = createStore(rootReducer, initialState, composeEnhancers(
    middlewares
  ))

	sagaMiddleware.run(rootSaga)

	return store
}
