import { IUser } from './../../../auth/models/IUser';
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
        reviewLowestError,
        postReviewSuccess,
        postReviewError,
        putReviewSuccess,
        putReviewError} from './actions'
import { IApplicationState } from '../../../../store/roots/rootReducer';
import { IRestaurant } from '../models/IRestaurant';
import History from '../../../../History';

export function* handleRestaurantDetailRequest({ type }: {
  type: string,
}): Generator{
	try {
    const { pathname } = History.location
    const res: any = yield API.get(`restaurants${pathname}`)
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
    const user: IUser | any = yield select((state: IApplicationState) => state.auth.user);

    const { pathname } = History.location
    const res: any = yield API.get(`reviews/restaurant${pathname}?sort=-createdAt`)
    const data: IPayload<IReview[]> = res.data
		yield put(reviewsSuccess(data, user))

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
    const { pathname } = History.location
    const res: any = yield API.get(`reviews/restaurant${pathname}/highest`)
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
    const { pathname } = History.location
    const res: any = yield API.get(`reviews/restaurant${pathname}/lowest`)
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

export function* handlePostReview({ type, payload }: {
  type: string,
  payload: IReview
}): Generator{
	try {
    const restaurant: IRestaurant | any = yield select((state: IApplicationState) => state.restaurantDetail.restaurant);
    const body = {
      ...payload,
      restaurant: restaurant.id
    }
    yield API.post(`reviews`, body)
		yield put(postReviewSuccess())
	} catch (err) {
		yield put(postReviewError())
	}
}

export function* handlePutReview({ type, payload }: {
  type: string,
  payload: IReview
}): Generator{
	try {
    const restaurant: IRestaurant | any = yield select((state: IApplicationState) => state.restaurantDetail.restaurant);
    const review: IReview | any = yield select((state: IApplicationState) => state.restaurantDetail.reviewToEdit);

    const body = {
      ...payload,
      restaurant: restaurant.id
    }
    yield API.put(`reviews/${review.id}`, body)
		yield put(putReviewSuccess())
	} catch (err) {
		yield put(putReviewError())
	}
}



