import { IPayload } from './../../../../utils/models/IPayload';
import { Reducer } from 'redux';
import { ActionTypes, IRestaurantsListState } from './types'
import { IRestaurant } from '../models/IRestaurant';
import { isEmpty } from 'lodash';

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
  sortAsc: false,

  restaurantModalOpen: false,
  restaurantModalLoading: false,
  restaurantToEdit: {} as IRestaurant
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

const restaurantsListChangeLimit = (state: IRestaurantsListState, {type, payload}: {
  type: string,
  payload: number
}): IRestaurantsListState => {
  return {
    ...state,
    limit: payload,
    page: 1,
    loading: true
  }
}

const restaurantsListChangePage = (state: IRestaurantsListState, {type, payload}: {
  type: string,
  payload: number
}): IRestaurantsListState => {
  return {
    ...state,
    page: payload,
    loading: true
  }
}

const restaurantsListChangeSort = (state: IRestaurantsListState, {type, payload}: {
  type: string,
  payload: {sortAsc: boolean, sort: string}
}): IRestaurantsListState => {
  return {
    ...state,
    sortAsc: payload.sortAsc,
    sort: payload.sort,
    loading: true
  }
}

const restaurantsListChangeSearchText = (state: IRestaurantsListState, {type, payload}: {
  type: string,
  payload: string
}): IRestaurantsListState => {
  return {
    ...state,
    loading: true,
    searchText: payload,
    page: 1
  }
}

const openRestaurantModal = (state: IRestaurantsListState, {type, payload}: {
  type: string,
  payload: IRestaurant
} ): IRestaurantsListState => {

  return {
    ...state,
    restaurantModalOpen: true,
    restaurantToEdit: !isEmpty(payload) ? payload : {} as IRestaurant
  }
}

const closeRestaurantModal = (state: IRestaurantsListState): IRestaurantsListState => {
  return {
    ...state,
    restaurantModalOpen: false,
    restaurantToEdit: {} as IRestaurant
  }
}

const postRestaurant = (state: IRestaurantsListState): IRestaurantsListState => {
  return {
    ...state,
    restaurantModalLoading: true,
  }
}

const postRestaurantSuccess = (state: IRestaurantsListState): IRestaurantsListState => {
  return {
    ...state,
    restaurantModalLoading: false,
    restaurantModalOpen: false
  }
}

const postRestaurantError = (state: IRestaurantsListState): IRestaurantsListState => {
  return {
    ...state,
    restaurantModalLoading: false
  }
}

const putRestaurant = (state: IRestaurantsListState): IRestaurantsListState => {
  return {
    ...state,
    restaurantModalLoading: true,
  }
}

const putRestaurantSuccess = (state: IRestaurantsListState): IRestaurantsListState => {
  return {
    ...state,
    restaurantModalOpen: false,
    restaurantModalLoading: false,
    restaurantToEdit: {} as IRestaurant,
    loading: true
  }
}

const putRestaurantError = (state: IRestaurantsListState): IRestaurantsListState => {
  return {
    ...state,
    restaurantModalLoading: false
  }
}

const deleteRestaurant = (state: IRestaurantsListState): IRestaurantsListState => {
  return {
    ...state,
    restaurantModalLoading: true,
  }
}

const deleteRestaurantSuccess = (state: IRestaurantsListState): IRestaurantsListState => {
  let page = state.page
  if (state.restaurants.rows.length === 1) {
    page = page > 1 ? page - 1 : 1
  }

  return {
    ...state,
    restaurantModalOpen: false,
    restaurantModalLoading: false,
    restaurantToEdit: {} as IRestaurant,
    page,
    loading: true
  }
}

const deleteRestaurantError = (state: IRestaurantsListState): IRestaurantsListState => {
  return {
    ...state,
    restaurantModalLoading: false
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

    case ActionTypes.RESTAURANTS_LIST_CHANGE_LIMIT: return restaurantsListChangeLimit(state, action)
		case ActionTypes.RESTAURANTS_LIST_CHANGE_PAGE: return restaurantsListChangePage(state, action)
		case ActionTypes.RESTAURANTS_LIST_CHANGE_SORT: return restaurantsListChangeSort(state, action)
		case ActionTypes.RESTAURANTS_LIST_CHANGE_SEARCH_TEXT: return restaurantsListChangeSearchText(state, action)

    case ActionTypes.OPEN_RESTAURANT_MODAL: return openRestaurantModal(state, action)
		case ActionTypes.CLOSE_RESTAURANT_MODAL: return closeRestaurantModal(state)

    case ActionTypes.POST_RESTAURANT: return postRestaurant(state)
		case ActionTypes.POST_RESTAURANT_SUCCESS: return postRestaurantSuccess(state)
		case ActionTypes.POST_RESTAURANT_ERROR: return postRestaurantError(state)

		case ActionTypes.PUT_RESTAURANT: return putRestaurant(state)
		case ActionTypes.PUT_RESTAURANT_SUCCESS: return putRestaurantSuccess(state)
		case ActionTypes.PUT_RESTAURANT_ERROR: return putRestaurantError(state)

		case ActionTypes.DELETE_RESTAURANT: return deleteRestaurant(state)
		case ActionTypes.DELETE_RESTAURANT_SUCCESS: return deleteRestaurantSuccess(state)
		case ActionTypes.DELETE_RESTAURANT_ERROR: return deleteRestaurantError(state)

		default:
			return state
	}
}
