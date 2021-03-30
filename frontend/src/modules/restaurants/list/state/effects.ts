import { IPayload } from './../../../../utils/models/IPayload';
import { put, select } from 'redux-saga/effects'
import API from './../../../../services/api'
import createQueryParams from '../../../../utils/createQueryParams';
import { restaurantsListSuccess, restaurantsListError } from './actions'
import { IApplicationState } from '../../../../store/roots/rootReducer';
import { IRestaurant } from '../models/IRestaurant';

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
