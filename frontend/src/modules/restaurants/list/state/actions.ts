import { action } from 'typesafe-actions'
import { ActionTypes } from './types'
import { IPayload } from '../../../../utils/models/IPayload';
import { IRestaurant, IRestaurantData } from '../models/IRestaurant';

export const restaurantsListRequest = () => {
	return action(ActionTypes.RESTAURANTS_LIST_REQUEST)
}

export const restaurantsListSuccess = (data: IPayload<IRestaurant[]>) =>
  action(ActionTypes.RESTAURANTS_LIST_SUCCESS, data)

export const restaurantsListError = (message: string) =>
	action(ActionTypes.RESTAURANTS_LIST_ERROR, message)


export const restaurantsListChangeLimit = (limit: number) =>
	action(ActionTypes.RESTAURANTS_LIST_CHANGE_LIMIT, limit)

export const restaurantsListChangePage = (page: number) =>
	action(ActionTypes.RESTAURANTS_LIST_CHANGE_PAGE, page)

export const restaurantsListChangeSort = (sortAsc: boolean, sort:string) =>
	action(ActionTypes.RESTAURANTS_LIST_CHANGE_SORT, {sortAsc, sort})

export const restaurantsListChangeSearchText = (text: string) =>
	action(ActionTypes.RESTAURANTS_LIST_CHANGE_SEARCH_TEXT, text)


// Open modal Restaurant
export const openRestaurantModal = (restaurant?: IRestaurant) =>
  action(ActionTypes.OPEN_RESTAURANT_MODAL, restaurant)

export const closeRestaurantModal = () =>
  action(ActionTypes.CLOSE_RESTAURANT_MODAL)


// Submit User
export const postRestaurant = (restaurant: IRestaurantData) =>
  action(ActionTypes.POST_RESTAURANT, restaurant)

export const postRestaurantSuccess = () =>
  action(ActionTypes.POST_RESTAURANT_SUCCESS)

export const postRestaurantError = () =>
  action(ActionTypes.POST_RESTAURANT_ERROR)

export const putRestaurant = (restaurant: IRestaurantData) =>
  action(ActionTypes.PUT_RESTAURANT, restaurant)

export const putRestaurantSuccess = () =>
  action(ActionTypes.PUT_RESTAURANT_SUCCESS)

export const putRestaurantError = () =>
  action(ActionTypes.PUT_RESTAURANT_ERROR)

export const deleteRestaurant = () =>
  action(ActionTypes.DELETE_RESTAURANT)

export const deleteRestaurantSuccess = () =>
  action(ActionTypes.DELETE_RESTAURANT_SUCCESS)

export const deleteRestaurantError = () =>
  action(ActionTypes.DELETE_RESTAURANT_ERROR)
