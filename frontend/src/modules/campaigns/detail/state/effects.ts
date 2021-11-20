import { IUser } from '../../../auth/models/IUser';
import { IReview } from '../models/IReviews';
import { IPayload } from '../../../../utils/models/IPayload';
import { put, select } from 'redux-saga/effects'
import API from '../../../../services/api'
import { campaignDetailSuccess,
        campaignDetailError,
		scanInfluencersSuccess,
		scanInfluencersError
      } from './actions'
import { IApplicationState } from '../../../../store/roots/rootReducer';
import { ICampaign } from '../models/ICampaign';
import History from '../../../../History';
import { toastr } from 'react-redux-toastr'
import errorToast from '../../../../utils/models/errorToast';
import { ITweet } from '../models/ITweet';

export function* handleCampaignDetailRequest({ type }: {
  type: string,
}): Generator{
	try {
	console.log('History.location', History.location)
    const { pathname } = History.location

	const url = pathname.replace('/company/','');
	console.log('url', url)
    const res: any = yield API.get(`${url}`)
    const data: ICampaign = res.data
		yield put(campaignDetailSuccess(data))

	} catch (err) {
		if (err instanceof Error) {
			yield put(campaignDetailError(err.stack!))
		} else {
			yield put(campaignDetailError('An unknown error occured.'))
		}
	}
}


export function* handleScanInfluencersRequest({ type }: {
	type: string,
  }): Generator{
	  try {
	  console.log('History.location', History.location)
	  const { pathname } = History.location
  
	  const url = pathname.replace('/company/','');
	  const res: any = yield API.post(`${url}/analyze`)
	  const data: Array<ITweet> = res.data
	  yield put(scanInfluencersSuccess(data))
  
	  } catch (err) {
		  if (err instanceof Error) {
			  yield put(scanInfluencersError(err.stack!))
		  } else {
			  yield put(scanInfluencersError('An unknown error occured.'))
		  }
	  }
  }
  