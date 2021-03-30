import { IPayload } from './../../../../utils/models/IPayload';
import { Reducer } from 'redux';
import { ActionTypes, IRestaurantsListState } from './types'
import { IRestaurant } from '../models/IRestaurant';

export const INITIAL_STATE: IRestaurantsListState = {
	loading: false,
  error: false,
  restaurants: {
    count: 0,
    rows: []
  } as IPayload<IRestaurant[]>,
  page: 1,
  sort: 'averageRate',
  limit: 6,
  searchText: '',
  sortAsc: true
}

const restaurantsListRequest = (state: IRestaurantsListState) :IRestaurantsListState => {
  return {
    ...state,
    loading: true
  }
}

const restaurantsListSuccess = (state: IRestaurantsListState, {type, payload}: {
  type: string,
  payload: IPayload<IRestaurant[]>
} ): IRestaurantsListState => {
  return {
    ...state,
    loading: false,
    restaurants: payload
  }
}

const restaurantsListError = (state: IRestaurantsListState): IRestaurantsListState => {
  return {
    ...state,
    loading: false
  }
}

export const restaurantsListReducer: Reducer<IRestaurantsListState> = (
	state: IRestaurantsListState = INITIAL_STATE,
	action: any
): IRestaurantsListState => {
	switch (action.type) {
		case ActionTypes.RESTAURANTS_LIST_REQUEST: return restaurantsListRequest(state)
		case ActionTypes.RESTAURANTS_LIST_SUCCESS: return restaurantsListSuccess(state, action)
		case ActionTypes.RESTAURANTS_LIST_ERROR: return restaurantsListError(state)

		default:
			return state
	}
}
