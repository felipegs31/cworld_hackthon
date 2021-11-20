import { IUser } from './../../../auth/models/IUser';
import { IReview, IReviewData } from './../models/IReviews';
import { IPayload } from './../../../../utils/models/IPayload';
import { IRestaurant } from './../models/IRestaurant';
import { action } from 'typesafe-actions'
import { ActionTypes } from './types'


// Restaurants
export const restaurantDetailRequest = () => {
	return action(ActionTypes.RESTAURANT_DETAIL_REQUEST)
}

export const restaurantDetailSuccess = (data: IRestaurant) =>
  action(ActionTypes.RESTAURANT_DETAIL_SUCCESS, data)

export const restaurantDetailError = (message: string) =>
	action(ActionTypes.RESTAURANT_DETAIL_ERROR, message)

// Reviews fetch
export const reviewsRequest = () => {
  return action(ActionTypes.REVIEWS_REQUEST)
}

export const reviewsSuccess = (data: IPayload<IReview[]>, user: IUser) =>
  action(ActionTypes.REVIEWS_SUCCESS, { data, user })

export const reviewsError = (message: string) =>
  action(ActionTypes.REVIEWS_ERROR, message)

export const reviewHighestRequest = () => {
  return action(ActionTypes.REVIEW_HIGHEST_REQUEST)
}

export const reviewHighestSuccess = (data: IReview) =>
  action(ActionTypes.REVIEW_HIGHEST_SUCCESS, data)

export const reviewHighestError = (message: string) =>
  action(ActionTypes.REVIEW_HIGHEST_ERROR, message)

export const reviewLowestRequest = () => {
  return action(ActionTypes.REVIEW_LOWEST_REQUEST)
}

export const reviewLowestSuccess = (data: IReview) =>
  action(ActionTypes.REVIEW_LOWEST_SUCCESS, data)

export const reviewLowestError = (message: string) =>
  action(ActionTypes.REVIEW_LOWEST_ERROR, message)

// Open modal Review
export const openReviewModal = (review?: IReview) =>
  action(ActionTypes.OPEN_REVIEW_MODAL, review)

export const closeReviewModal = () =>
  action(ActionTypes.CLOSE_REVIEW_MODAL)

// Submit Review

export const postReview = (review: IReviewData) =>
  action(ActionTypes.POST_REVIEW, review)

export const postReviewSuccess = () =>
  action(ActionTypes.POST_REVIEW_SUCCESS)

export const postReviewError = () =>
  action(ActionTypes.POST_REVIEW_ERROR)

export const putReview = (review: IReviewData) =>
  action(ActionTypes.PUT_REVIEW, review)

export const putReviewSuccess = () =>
  action(ActionTypes.PUT_REVIEW_SUCCESS)

export const putReviewError = () =>
  action(ActionTypes.PUT_REVIEW_ERROR)

export const deleteReview = () =>
  action(ActionTypes.DELETE_REVIEW)

export const deleteReviewSuccess = () =>
  action(ActionTypes.DELETE_REVIEW_SUCCESS)

export const deleteReviewError = () =>
  action(ActionTypes.DELETE_REVIEW_ERROR)
