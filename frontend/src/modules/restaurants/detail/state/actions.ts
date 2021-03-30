import { IReview } from './../models/IReviews';
import { IPayload } from './../../../../utils/models/IPayload';
import { IRestaurant } from './../models/IRestaurant';
import { action } from 'typesafe-actions'
import { ActionTypes } from './types'

export const restaurantDetailRequest = (id: string) => {
	return action(ActionTypes.RESTAURANT_DETAIL_REQUEST, id)
}

export const restaurantDetailSuccess = (data: IRestaurant) =>
  action(ActionTypes.RESTAURANT_DETAIL_SUCCESS, data)

export const restaurantDetailError = (message: string) =>
	action(ActionTypes.RESTAURANT_DETAIL_ERROR, message)


export const reviewsRequest = (id: string) => {
  return action(ActionTypes.REVIEWS_REQUEST, id)
}

export const reviewsSuccess = (data: IPayload<IReview[]>) =>
  action(ActionTypes.REVIEWS_SUCCESS, data)

export const reviewsError = (message: string) =>
  action(ActionTypes.REVIEWS_ERROR, message)


export const reviewHighestRequest = (id: string) => {
  return action(ActionTypes.REVIEW_HIGHEST_REQUEST, id)
}

export const reviewHighestSuccess = (data: IReview) =>
  action(ActionTypes.REVIEW_HIGHEST_SUCCESS, data)

export const reviewHighestError = (message: string) =>
  action(ActionTypes.REVIEW_HIGHEST_ERROR, message)


export const reviewLowestRequest = (id: string) => {
  return action(ActionTypes.REVIEW_LOWEST_REQUEST, id)
}

export const reviewLowestSuccess = (data: IReview) =>
  action(ActionTypes.REVIEW_LOWEST_SUCCESS, data)

export const reviewLowestError = (message: string) =>
  action(ActionTypes.REVIEW_LOWEST_ERROR, message)
