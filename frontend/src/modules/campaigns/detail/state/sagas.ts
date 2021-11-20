import { ActionTypes } from './types'
import { all, fork, takeLatest } from 'redux-saga/effects'
import { handleCampaignDetailRequest, handleScanInfluencersRequest } from './effects'


/**
 * @desc Watches every specified action and runs effect method and passes action args to it
 */
function* watchCampaignDetail(): Generator {
  yield takeLatest([ActionTypes.CAMPAIGN_DETAIL_REQUEST], handleCampaignDetailRequest)
  yield takeLatest([ActionTypes.SCAN_INFLUENCERS_REQUEST], handleScanInfluencersRequest)
  
}

function* watchTabsChange(): Generator {
	// yield takeLatest([ActionTypes.SET_TAB_CAMPAIGN], handleSetTabCampaign)
}

/**
 * @desc saga init, forks in effects, other sagas
 */
export default function* restaurantSaga() {
	yield all([
		fork(watchCampaignDetail)
	])
}
