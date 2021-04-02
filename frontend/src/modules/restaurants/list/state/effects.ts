import { IPayload } from './../../../../utils/models/IPayload';
import { put, select } from 'redux-saga/effects'
import API from './../../../../services/api'
import createQueryParams from '../../../../utils/createQueryParams';
import { restaurantsListSuccess,
         restaurantsListError,
         postRestaurantSuccess,
         postRestaurantError,
         putRestaurantSuccess,
         putRestaurantError,
         deleteRestaurantSuccess,
         deleteRestaurantError } from './actions'
import { IApplicationState } from '../../../../store/roots/rootReducer';
import { IRestaurant } from '../models/IRestaurant';
import { toastr } from 'react-redux-toastr'
import errorToast from '../../../../utils/models/errorToast';

export function* handleRestaurantsListRequest({ type }: {
  type: string
}): Generator{
	try {
    const page: number | any = yield select((state: IApplicationState) => state.restaurantsList.page);
    const limit: number | any = yield select((state: IApplicationState) => state.restaurantsList.limit);
    const sort: string | any = yield select((state: IApplicationState) => state.restaurantsList.sort);
    const asc: boolean | any = yield select((state: IApplicationState) => state.restaurantsList.sortAsc);
    const searchText: string | any = yield select((state: IApplicationState) => state.restaurantsList.searchText);

    const query = createQueryParams(page, limit, sort, asc, searchText)

    const res: any = yield API.get(`restaurants${query}`)
    const data: IPayload<IRestaurant[]> = res.data
		yield put(restaurantsListSuccess(data))

	} catch (err) {
		if (err instanceof Error) {
			yield put(restaurantsListError(err.stack!))
		} else {
			yield put(restaurantsListError('An unknown error occured.'))
		}
	}
}

export function* handlePostRestaurant({ type, payload }: {
  type: string,
  payload: IRestaurant
}): Generator{
	try {

    yield API.post(`restaurants`, payload)
		yield put(postRestaurantSuccess())
    toastr.success('Restaurant Added', '')
	} catch (err) {
		yield put(postRestaurantError())
    errorToast(err)

	}
}

export function* handlePutRestaurant({ type, payload }: {
  type: string,
  payload: IRestaurant
}): Generator{
	try {
    const restaurant: IRestaurant | any = yield select((state: IApplicationState) => state.restaurantsList.restaurantToEdit);

    yield API.put(`restaurants/${restaurant.id}`, payload)
		yield put(putRestaurantSuccess())
    toastr.success('Restaurant Updated', '')

	} catch (err) {
		yield put(putRestaurantError())
    errorToast(err)

	}
}

export function* handleDeleteRestaurant({ type }: {
  type: string
}): Generator{
	try {
    const restaurant: IRestaurant | any = yield select((state: IApplicationState) => state.restaurantsList.restaurantToEdit);

    yield API.put(`restaurants/${restaurant.id}/delete`)
		yield put(deleteRestaurantSuccess())
    toastr.success('Restaurant Deleted', '')

	} catch (err) {
		yield put(deleteRestaurantError())
    errorToast(err)

	}
}

