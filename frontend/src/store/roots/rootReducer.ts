import { IRestaurantsListState } from './../../modules/restaurants/list/state/types'
import { IRestaurantDetailState } from './../../modules/restaurants/detail/state/types'
import { IUsersListState } from './../../modules/users/list/state/types'

import { combineReducers } from 'redux'
import { IAuthState } from '../../modules/auth/state/types'

import { authReducer } from '../../modules/auth/state/reducers'
import { restaurantsListReducer } from './../../modules/restaurants/list/state/reducers'
import { restaurantDetailReducer } from './../../modules/restaurants/detail/state/reducers'
import { usersListReducer } from './../../modules/users/list/state/reducers'
import {reducer as toastrReducer} from 'react-redux-toastr'
import { ActionTypes } from './../../modules/auth/state/types'
export interface IApplicationState {
	auth: IAuthState,
	restaurantsList: IRestaurantsListState,
	restaurantDetail: IRestaurantDetailState,
  usersList: IUsersListState,
  toastr: any
}

const appReducer = combineReducers<IApplicationState>({
  auth: authReducer,
  restaurantsList: restaurantsListReducer,
  restaurantDetail: restaurantDetailReducer,
  usersList: usersListReducer,
  toastr: toastrReducer
});

const rootReducer = (state: any, action: any) => {
	if (action.type === ActionTypes.LOGOUT) {
		state = undefined;
	}

	return appReducer(state, action);
};

export default rootReducer
