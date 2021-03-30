import { action } from 'typesafe-actions'
import { ActionTypes } from './types'
import { IPayload } from '../../../../utils/models/IPayload';
import { IRestaurant } from '../models/IRestaurant';

export const restaurantsListRequest = () => {
	return action(ActionTypes.RESTAURANTS_LIST_REQUEST)
}

export const restaurantsListSuccess = (data: IPayload<IRestaurant[]>) =>
  action(ActionTypes.RESTAURANTS_LIST_SUCCESS, data)

export const restaurantsListError = (message: string) =>
	action(ActionTypes.RESTAURANTS_LIST_ERROR, message)
