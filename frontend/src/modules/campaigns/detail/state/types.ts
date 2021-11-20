import { IReview } from '../models/IReviews';
import { IPayload } from '../../../../utils/models/IPayload';
import { IRatesPercent } from '../models/IRatesPercent';
import { IRestaurant } from '../models/IRestaurant';
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

  OPEN_REVIEW_MODAL = '@restaurant_detail/OPEN_REVIEW_MODAL',
  CLOSE_REVIEW_MODAL = '@restaurant_detail/CLOSE_REVIEW_MODAL',

  POST_REVIEW = '@restaurant_detail/POST_REVIEW',
  POST_REVIEW_SUCCESS = '@restaurant_detail/POST_REVIEW_SUCCESS',
  POST_REVIEW_ERROR = '@restaurant_detail/POST_REVIEW_ERROR',

  PUT_REVIEW = '@restaurant_detail/PUT_REVIEW',
  PUT_REVIEW_SUCCESS = '@restaurant_detail/PUT_REVIEW_SUCCESS',
  PUT_REVIEW_ERROR = '@restaurant_detail/PUT_REVIEW_ERROR',

  DELETE_REVIEW = '@restaurant_detail/DELETE_REVIEW',
  DELETE_REVIEW_SUCCESS = '@restaurant_detail/DELETE_REVIEW_SUCCESS',
  DELETE_REVIEW_ERROR = '@restaurant_detail/DELETE_REVIEW_ERROR',

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

  readonly reviewModalOpen: boolean
  readonly reviewModalLoading: boolean
  readonly reviewToEdit: IReview

}
