import { IReview } from './../models/IReviews';
import { IPayload } from './../../../../utils/models/IPayload';
import { IRatesPercent } from '../models/IRatesPercent';
import { IRestaurant } from './../models/IRestaurant';
/**
 * Action types
 */
export enum ActionTypes {
  RESTAURANT_DETAIL_REQUEST = '@restaurant_detail/RESTAURANT_DETAIL_REQUEST',
  RESTAURANT_DETAIL_SUCCESS = '@restaurant_detail/RESTAURANT_DETAIL_SUCCESS',
  RESTAURANT_DETAIL_ERROR = '@restaurant_detail/RESTAURANT_DETAIL_ERROR',

  REVIEWS_REQUEST = '@restaurant_detail/REVIEWS_REQUEST',
  REVIEWS_SUCCESS = '@restaurant_detail/REVIEWS_SUCCESS',
  REVIEWS_ERROR = '@restaurant_detail/REVIEWS_ERROR',

  REVIEW_HIGHEST_REQUEST = '@restaurant_detail/REVIEW_HIGHEST_REQUEST',
  REVIEW_HIGHEST_SUCCESS = '@restaurant_detail/REVIEW_HIGHEST_SUCCESS',
  REVIEW_HIGHEST_ERROR = '@restaurant_detail/REVIEW_HIGHEST_ERROR',

  REVIEW_LOWEST_REQUEST = '@restaurant_detail/REVIEW_LOWEST_REQUEST',
  REVIEW_LOWEST_SUCCESS = '@restaurant_detail/REVIEW_LOWEST_SUCCESS',
  REVIEW_LOWEST_ERROR = '@restaurant_detail/REVIEW_LOWEST_ERROR',
}


/**
 * State type
 */
export interface IRestaurantDetailState {
  readonly loading: boolean
  readonly error: boolean
  readonly restaurant: IRestaurant
  readonly totalRates: number
  readonly ratesPercent: IRatesPercent[]

  readonly reviews: IPayload<IReview[]>
  readonly loadingReviews: boolean
  readonly errorReviews: boolean

  readonly reviewHighest: IReview
  readonly loadingReviewHighest: boolean
  readonly errorReviewHighest: boolean

  readonly reviewLowest: IReview
  readonly loadingReviewLowest: boolean
  readonly errorReviewLowest: boolean

}
