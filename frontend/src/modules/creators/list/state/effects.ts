import { IPayload } from '../../../../utils/models/IPayload';
import { put, select } from 'redux-saga/effects'
import API from '../../../../services/api'
import createQueryParams from '../../../../utils/createQueryParams';
import { rewardsListSuccess,
         rewardsListError,
         } from './actions'
import { IApplicationState } from '../../../../store/roots/rootReducer';
import { ICampaign } from '../models/ICampaign';
import { toastr } from 'react-redux-toastr'
import errorToast from '../../../../utils/models/errorToast';

export function* handleRewardsListRequest({ type }: {
  type: string
}): Generator{
	try {
    const res: any = yield API.get(`users/rewards`)
    const data: IPayload<ICampaign[]> = res.data
		yield put(rewardsListSuccess(data))

	} catch (err) {
		if (err instanceof Error) {
			yield put(rewardsListError(err.stack!))
		} else {
			yield put(rewardsListError('An unknown error occured.'))
		}
	}
}
