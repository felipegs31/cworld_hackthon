import { IPayload } from '../../../../utils/models/IPayload';
import { put, select } from 'redux-saga/effects'
import API from '../../../../services/api'
import createQueryParams from '../../../../utils/createQueryParams';
import { rewardsListSuccess,
         rewardsListError,
		 addKeySuccess,
		 addKeyError,
		 claimSuccess,
		 claimError
         } from './actions'
import { IApplicationState } from '../../../../store/roots/rootReducer';
import { IReward } from '../models/IReward';
import { toastr } from 'react-redux-toastr'
import errorToast from '../../../../utils/models/errorToast';

export function* handleRewardsListRequest({ type }: {
  type: string
}): Generator{
	try {
    const res: any = yield API.get(`users/rewards`)
    const data: IPayload<IReward[]> = res.data
		yield put(rewardsListSuccess(data))

	} catch (err) {
		if (err instanceof Error) {
			yield put(rewardsListError(err.stack!))
		} else {
			yield put(rewardsListError('An unknown error occured.'))
		}
	}
}


export function* handleAddKeyRequest({ type, payload }: {
	type: string,
	payload: {twitterId: string, walletAddress: string}
  }): Generator{
	  try {
	  const res: any = yield API.put(`users/addkeys`, payload)
	  const data: IPayload<IReward[]> = res.data
		  yield put(addKeySuccess(data))
  
	  } catch (err) {
		  if (err instanceof Error) {
			  yield put(addKeyError(err.stack!))
		  } else {
			  yield put(addKeyError('An unknown error occured.'))
		  }
	  }
  }
  

  export function* handleClaimRequest({ type, payload }: {
	type: string,
	payload: {rewardId: string}
  }): Generator{
	  try {
	  const res: any = yield API.post(`rewards/${payload.rewardId}/claim`)
	  const data: any = res.data
	  yield put(claimSuccess(data))
	  toastr.success('Claimed!', 'Your Reward was claimed')
  
	  } catch (err) {
		  if (err instanceof Error) {
			  yield put(claimError(err.stack!))
		  } else {
			  yield put(claimError('An unknown error occured.'))
		  }
	  }
  }
  