import { IReview } from './../models/IReviews';
import { IPayload } from './../../../../utils/models/IPayload';
import { IRestaurant } from './../models/IRestaurant';
import { Reducer } from 'redux';
import { ActionTypes, IRestaurantDetailState } from './types'
import { IRatesPercent } from '../models/IRatesPercent';

export const INITIAL_STATE: IRestaurantDetailState = {
	loading: false,
  error: false,
  restaurant: {} as IRestaurant,
  totalRates: 0,
  ratesPercent: [],
  reviews: {
    count: 0,
    rows: []
  } as IPayload<IReview[]>,
  loadingReviews: false,
  errorReviews: false,

  reviewHighest: {} as IReview,
  loadingReviewHighest: false,
  errorReviewHighest: false,

  reviewLowest: {} as IReview,
  loadingReviewLowest: false,
  errorReviewLowest: false
}


const restaurantDetailRequest = (state: IRestaurantDetailState) :IRestaurantDetailState => {
  return {
    ...state,
    loading: true,
    error: false
  }
}

const restaurantDetailSuccess = (state: IRestaurantDetailState, {type, payload}: {
  type: string,
  payload: IRestaurant
} ): IRestaurantDetailState => {
  const rates = payload.rates as any
  let sum = 0
  const ratesPercent: IRatesPercent[] = []

  Object.keys(rates).forEach((key: string) =>
    sum += rates[key]
  )

  Object.keys(rates).forEach((key: string, index: number) => {
    return ratesPercent.unshift({
      percent: Math.round(rates[key]/sum * 100),
      stars: index + 1
    })
  })

  return {
    ...state,
    loading: false,
    restaurant: payload,
    totalRates: sum,
    ratesPercent
  }
}

const restaurantDetailError = (state: IRestaurantDetailState): IRestaurantDetailState => {
  return {
    ...state,
    loading: false,
    error: true
  }
}

const reviewsRequest = (state: IRestaurantDetailState) :IRestaurantDetailState => {
  return {
    ...state,
    loadingReviews: true,
    errorReviews: false
  }
}

const reviewsSuccess = (state: IRestaurantDetailState, {type, payload}: {
  type: string,
  payload: IPayload<IReview[]>
} ): IRestaurantDetailState => {
  return {
    ...state,
    loadingReviews: false,
    reviews: payload,
  }
}

const reviewsError = (state: IRestaurantDetailState): IRestaurantDetailState => {
  return {
    ...state,
    loadingReviews: false,
    errorReviews: true
  }
}

const reviewHighestRequest = (state: IRestaurantDetailState) :IRestaurantDetailState => {
  return {
    ...state,
    loadingReviewHighest: true,
    errorReviewHighest: false
  }
}

const reviewHighestSuccess = (state: IRestaurantDetailState, {type, payload}: {
  type: string,
  payload: IReview
} ): IRestaurantDetailState => {
  return {
    ...state,
    loadingReviewHighest: false,
    reviewHighest: payload,
  }
}

const reviewHighestError = (state: IRestaurantDetailState): IRestaurantDetailState => {
  return {
    ...state,
    loadingReviewHighest: false,
    errorReviewHighest: true
  }
}

const reviewLowestRequest = (state: IRestaurantDetailState) :IRestaurantDetailState => {
  return {
    ...state,
    loadingReviewLowest: true,
    errorReviewLowest: false
  }
}

const reviewLowestSuccess = (state: IRestaurantDetailState, {type, payload}: {
  type: string,
  payload: IReview
} ): IRestaurantDetailState => {
  return {
    ...state,
    loadingReviewLowest: false,
    reviewLowest: payload,
  }
}

const reviewLowestError = (state: IRestaurantDetailState): IRestaurantDetailState => {
  return {
    ...state,
    loadingReviewLowest: false,
    errorReviewLowest: true
  }
}

export const restaurantDetailReducer: Reducer<IRestaurantDetailState> = (
	state: IRestaurantDetailState = INITIAL_STATE,
	action: any
): IRestaurantDetailState => {
	switch (action.type) {
		case ActionTypes.RESTAURANT_DETAIL_REQUEST: return restaurantDetailRequest(state)
		case ActionTypes.RESTAURANT_DETAIL_SUCCESS: return restaurantDetailSuccess(state, action)
		case ActionTypes.RESTAURANT_DETAIL_ERROR: return restaurantDetailError(state)

    case ActionTypes.REVIEWS_REQUEST: return reviewsRequest(state)
		case ActionTypes.REVIEWS_SUCCESS: return reviewsSuccess(state, action)
		case ActionTypes.REVIEWS_ERROR: return reviewsError(state)

    case ActionTypes.REVIEW_HIGHEST_REQUEST: return reviewHighestRequest(state)
		case ActionTypes.REVIEW_HIGHEST_SUCCESS: return reviewHighestSuccess(state, action)
		case ActionTypes.REVIEW_HIGHEST_ERROR: return reviewHighestError(state)

    case ActionTypes.REVIEW_LOWEST_REQUEST: return reviewLowestRequest(state)
		case ActionTypes.REVIEW_LOWEST_SUCCESS: return reviewLowestSuccess(state, action)
		case ActionTypes.REVIEW_LOWEST_ERROR: return reviewLowestError(state)

		default:
			return state
	}
}
