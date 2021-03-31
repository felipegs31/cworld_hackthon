import { IUser } from './../../../auth/models/IUser';
import { IPayload } from './../../../../utils/models/IPayload';
import { put, select } from 'redux-saga/effects'
import API from './../../../../services/api'
import createQueryParams from '../../../../utils/createQueryParams';
import { usersListSuccess, usersListError } from './actions'
import { IApplicationState } from '../../../../store/roots/rootReducer';

export function* handleUsersListRequest({ type }: {
  type: string
}): Generator{
	try {
    const page: number | any = yield select((state: IApplicationState) => state.usersList.page);
    const limit: number | any = yield select((state: IApplicationState) => state.usersList.limit);
    const sort: string | any = yield select((state: IApplicationState) => state.usersList.sort);
    const asc: boolean | any = yield select((state: IApplicationState) => state.usersList.sortAsc);
    const searchText: string | any = yield select((state: IApplicationState) => state.usersList.searchText);

    const query = createQueryParams(page, limit, sort, asc, searchText)
    console.log('query', query)
    const res: any = yield API.get(`users${query}`)
    const data: IPayload<IUser[]> = res.data
		yield put(usersListSuccess(data))

	} catch (err) {
		if (err instanceof Error) {
			yield put(usersListError(err.stack!))
		} else {
			yield put(usersListError('An unknown error occured.'))
		}
	}
}
