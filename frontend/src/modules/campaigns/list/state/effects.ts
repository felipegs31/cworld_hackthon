import { IPayload } from '../../../../utils/models/IPayload';
import { put, select } from 'redux-saga/effects'
import API from '../../../../services/api'
import createQueryParams from '../../../../utils/createQueryParams';
import { campaignsListSuccess,
         campaignsListError,
         postCampaignSuccess,
         postCampaignError,
         putCampaignSuccess,
         putCampaignError,
         deleteCampaignSuccess,
         deleteCampaignError } from './actions'
import { IApplicationState } from '../../../../store/roots/rootReducer';
import { ICampaign } from '../models/ICampaign';
import { toastr } from 'react-redux-toastr'
import errorToast from '../../../../utils/models/errorToast';

export function* handleCampaignsListRequest({ type }: {
  type: string
}): Generator{
	try {
    const page: number | any = yield select((state: IApplicationState) => state.campaignsList.page);
    const limit: number | any = yield select((state: IApplicationState) => state.campaignsList.limit);
    const sort: string | any = yield select((state: IApplicationState) => state.campaignsList.sort);
    const asc: boolean | any = yield select((state: IApplicationState) => state.campaignsList.sortAsc);
    const searchText: string | any = yield select((state: IApplicationState) => state.campaignsList.searchText);

    const query = createQueryParams(page, limit, sort, asc, searchText)

    const res: any = yield API.get(`campaigns${query}`)
    const data: IPayload<ICampaign[]> = res.data
		yield put(campaignsListSuccess(data))

	} catch (err) {
		if (err instanceof Error) {
			yield put(campaignsListError(err.stack!))
		} else {
			yield put(campaignsListError('An unknown error occured.'))
		}
	}
}

export function* handlePostCampaign({ type, payload }: {
  type: string,
  payload: ICampaign
}): Generator{
	try {

    yield API.post(`campaigns`, payload)
		yield put(postCampaignSuccess())
    toastr.success('Campaign Added', '')
	} catch (err) {
		yield put(postCampaignError())
    errorToast(err)

	}
}

export function* handlePutCampaign({ type, payload }: {
  type: string,
  payload: ICampaign
}): Generator{
	try {
    const campaign: ICampaign | any = yield select((state: IApplicationState) => state.campaignsList.campaignToEdit);

    yield API.put(`campaigns/${campaign.id}`, payload)
		yield put(putCampaignSuccess())
    toastr.success('Campaign Updated', '')

	} catch (err) {
		yield put(putCampaignError())
    errorToast(err)

	}
}

export function* handleDeleteCampaign({ type }: {
  type: string
}): Generator{
	try {
    const campaign: ICampaign | any = yield select((state: IApplicationState) => state.campaignsList.campaignToEdit);

    yield API.put(`campaigns/${campaign.id}/delete`)
		yield put(deleteCampaignSuccess())
    toastr.success('Campaign Deleted', '')

	} catch (err) {
		yield put(deleteCampaignError())
    errorToast(err)

	}
}

