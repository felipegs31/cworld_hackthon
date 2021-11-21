import { ActionTypes } from './types'
import { all, fork, takeLatest } from 'redux-saga/effects'
import { handleRewardsListRequest } from './effects'


/**
 * @desc Watches every specified action and runs effect method and passes action args to it
 */
function* watchRewardsList(): Generator {
  yield takeLatest([ActionTypes.REWARDS_LIST_REQUEST], handleRewardsListRequest)
}


/**
 * @desc saga init, forks in effects, other sagas
 */
export default function* creatorsListSaga() {
	yield all([
		fork(watchRewardsList),
	])
}
