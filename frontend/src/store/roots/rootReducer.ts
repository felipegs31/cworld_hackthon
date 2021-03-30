import { IRestaurantsListState } from './../../modules/restaurants/list/state/types'
import { IRestaurantDetailState } from './../../modules/restaurants/detail/state/types'
import { combineReducers } from 'redux'
import { IAuthState } from '../../modules/auth/state/types'
import { authReducer } from '../../modules/auth/state/reducers'
import { restaurantsListReducer } from './../../modules/restaurants/list/state/reducers'
import { restaurantDetailReducer } from './../../modules/restaurants/detail/state/reducers'



export interface IApplicationState {
	auth: IAuthState,
	restaurantsList: IRestaurantsListState,
	restaurantDetail: IRestaurantDetailState,
}

export default combineReducers<IApplicationState>({
  auth: authReducer,
  restaurantsList: restaurantsListReducer,
  restaurantDetail: restaurantDetailReducer,
});
