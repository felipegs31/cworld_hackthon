import { ActionTypes } from './types'
import { all, fork, takeLatest } from 'redux-saga/effects'
import { handleCampaignsListRequest,
         handlePostCampaign,
         handlePutCampaign,
         handleDeleteCampaign } from './effects'


/**
 * @desc Watches every specified action and runs effect method and passes action args to it
 */
function* watchCampaignsList(): Generator {
  yield takeLatest([ActionTypes.CAMPAIGNS_LIST_REQUEST,
                    ActionTypes.CAMPAIGNS_LIST_CHANGE_LIMIT,
                    ActionTypes.CAMPAIGNS_LIST_CHANGE_PAGE,
                    ActionTypes.CAMPAIGNS_LIST_CHANGE_SORT,
                    ActionTypes.CAMPAIGNS_LIST_CHANGE_SEARCH_TEXT,
                    ActionTypes.POST_CAMPAIGN_SUCCESS,
                    ActionTypes.PUT_CAMPAIGN_SUCCESS,
                    ActionTypes.DELETE_CAMPAIGN_SUCCESS], handleCampaignsListRequest)

  yield takeLatest(ActionTypes.POST_CAMPAIGN, handlePostCampaign)
  yield takeLatest(ActionTypes.PUT_CAMPAIGN, handlePutCampaign)
  yield takeLatest(ActionTypes.DELETE_CAMPAIGN, handleDeleteCampaign)
}


/**
 * @desc saga init, forks in effects, other sagas
 */
export default function* restaurantsListSaga() {
	yield all([
		fork(watchCampaignsList),
	])
}
