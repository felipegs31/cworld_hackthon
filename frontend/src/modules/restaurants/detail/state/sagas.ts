import { ActionTypes } from './types'
import { all, fork, takeLatest } from 'redux-saga/effects'
import { handleRestaurantDetailRequest,
        handleReviewHighestRequest,
        handleReviewLowestRequest,
        handleReviewsRequest } from './effects'


/**
 * @desc Watches every specified action and runs effect method and passes action args to it
 */
function* watchRestaurantDetail(): Generator {
  yield takeLatest(ActionTypes.RESTAURANT_DETAIL_REQUEST, handleRestaurantDetailRequest)
}

function* watchReviews(): Generator {
  yield takeLatest(ActionTypes.REVIEWS_REQUEST, handleReviewsRequest)
  yield takeLatest(ActionTypes.REVIEW_HIGHEST_REQUEST, handleReviewHighestRequest)
  yield takeLatest(ActionTypes.REVIEW_LOWEST_REQUEST, handleReviewLowestRequest)

}


/**
 * @desc saga init, forks in effects, other sagas
 */
export default function* restaurantSaga() {
	yield all([
		fork(watchRestaurantDetail),
		fork(watchReviews),
	])
}
