import { IReview } from './../models/IReviews';
import { IPayload } from './../../../../utils/models/IPayload';
import { put, select } from 'redux-saga/effects'
import API from './../../../../services/api'
import createQueryParams from '../../../../utils/createQueryParams';
import { restaurantDetailSuccess,
        restaurantDetailError,
        reviewsSuccess,
        reviewsError,
        reviewHighestSuccess,
        reviewHighestError,
        reviewLowestSuccess,
        reviewLowestError } from './actions'
import { IApplicationState } from '../../../../store/roots/rootReducer';
import { IRestaurant } from '../models/IRestaurant';

export function* handleRestaurantDetailRequest({ type, payload }: {
  type: string,
  payload: string
}): Generator{
	try {

    const res: any = yield API.get(`restaurants/${payload}`)
    const data: IRestaurant = res.data
		yield put(restaurantDetailSuccess(data))

	} catch (err) {
		if (err instanceof Error) {
			yield put(restaurantDetailError(err.stack!))
		} else {
			yield put(restaurantDetailError('An unknown error occured.'))
		}
	}
}


export function* handleReviewsRequest({ type, payload }: {
  type: string,
  payload: string
}): Generator{
	try {

    const res: any = yield API.get(`reviews/restaurant/${payload}?sort=-createdAt`)
    const data: IPayload<IReview[]> = res.data
		yield put(reviewsSuccess(data))

	} catch (err) {
		if (err instanceof Error) {
			yield put(reviewsError(err.stack!))
		} else {
			yield put(reviewsError('An unknown error occured.'))
		}
	}
}

export function* handleReviewHighestRequest({ type, payload }: {
  type: string,
  payload: string
}): Generator{
	try {

    const res: any = yield API.get(`reviews/restaurant/${payload}/highest`)
    const data: IReview = res.data
		yield put(reviewHighestSuccess(data))

	} catch (err) {
		if (err instanceof Error) {
			yield put(reviewHighestError(err.stack!))
		} else {
			yield put(reviewHighestError('An unknown error occured.'))
		}
	}
}

export function* handleReviewLowestRequest({ type, payload }: {
  type: string,
  payload: string
}): Generator{
	try {

    const res: any = yield API.get(`reviews/restaurant/${payload}/lowest`)
    const data: IReview = res.data
		yield put(reviewLowestSuccess(data))

	} catch (err) {
		if (err instanceof Error) {
			yield put(reviewLowestError(err.stack!))
		} else {
			yield put(reviewLowestError('An unknown error occured.'))
		}
	}
}



