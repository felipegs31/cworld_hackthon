import { ActionTypes } from './types'
import { all, fork, takeLatest } from 'redux-saga/effects'
import { handleRewardsListRequest, handleAddKeyRequest, handleClaimRequest } from './effects'


/**
 * @desc Watches every specified action and runs effect method and passes action args to it
 */
function* watchRewardsList(): Generator {
  yield takeLatest([ActionTypes.REWARDS_LIST_REQUEST, ActionTypes.CLAIM_SUCCESS], handleRewardsListRequest)
}

function* watchAddKey(): Generator {
  yield takeLatest([ActionTypes.ADD_KEY_USER_REQUEST], handleAddKeyRequest)
}


function* watchClaim(): Generator {
	yield takeLatest([ActionTypes.CLAIM_REQUEST], handleClaimRequest)
  }
  

/**
 * @desc saga init, forks in effects, other sagas
 */
export default function* creatorsListSaga() {
	yield all([
		fork(watchRewardsList),
		fork(watchAddKey),
		fork(watchClaim),
	])
}
