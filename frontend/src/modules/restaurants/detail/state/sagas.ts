import { ActionTypes } from './types'
import { all, fork, takeLatest } from 'redux-saga/effects'
import { handlePostReview, handlePutReview, handleRestaurantDetailRequest,
        handleReviewHighestRequest,
        handleReviewLowestRequest,
        handleReviewsRequest } from './effects'


/**
 * @desc Watches every specified action and runs effect method and passes action args to it
 */
function* watchRestaurantDetail(): Generator {
  yield takeLatest([ActionTypes.RESTAURANT_DETAIL_REQUEST,
                    ActionTypes.POST_REVIEW_SUCCESS,
                    ActionTypes.PUT_REVIEW_SUCCESS], handleRestaurantDetailRequest)
}

function* watchReviews(): Generator {
  yield takeLatest([ActionTypes.REVIEWS_REQUEST,
                    ActionTypes.POST_REVIEW_SUCCESS,
                    ActionTypes.PUT_REVIEW_SUCCESS], handleReviewsRequest)
  yield takeLatest([ActionTypes.REVIEW_HIGHEST_REQUEST,
                    ActionTypes.POST_REVIEW_SUCCESS,
                    ActionTypes.PUT_REVIEW_SUCCESS], handleReviewHighestRequest)
  yield takeLatest([ActionTypes.REVIEW_LOWEST_REQUEST,
                    ActionTypes.POST_REVIEW_SUCCESS,
                    ActionTypes.PUT_REVIEW_SUCCESS], handleReviewLowestRequest)

  yield takeLatest(ActionTypes.POST_REVIEW, handlePostReview)
  yield takeLatest(ActionTypes.PUT_REVIEW, handlePutReview)

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
