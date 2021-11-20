import { ActionTypes } from './types'
import { all, fork, takeLatest } from 'redux-saga/effects'
import { handleRestaurantsListRequest,
         handlePostRestaurant,
         handlePutRestaurant,
         handleDeleteRestaurant } from './effects'


/**
 * @desc Watches every specified action and runs effect method and passes action args to it
 */
function* watchRestaurantsList(): Generator {
  yield takeLatest([ActionTypes.RESTAURANTS_LIST_REQUEST,
                    ActionTypes.RESTAURANTS_LIST_CHANGE_LIMIT,
                    ActionTypes.RESTAURANTS_LIST_CHANGE_PAGE,
                    ActionTypes.RESTAURANTS_LIST_CHANGE_SORT,
                    ActionTypes.RESTAURANTS_LIST_CHANGE_SEARCH_TEXT,
                    ActionTypes.POST_RESTAURANT_SUCCESS,
                    ActionTypes.PUT_RESTAURANT_SUCCESS,
                    ActionTypes.DELETE_RESTAURANT_SUCCESS], handleRestaurantsListRequest)

  yield takeLatest(ActionTypes.POST_RESTAURANT, handlePostRestaurant)
  yield takeLatest(ActionTypes.PUT_RESTAURANT, handlePutRestaurant)
  yield takeLatest(ActionTypes.DELETE_RESTAURANT, handleDeleteRestaurant)
}


/**
 * @desc saga init, forks in effects, other sagas
 */
export default function* restaurantsListSaga() {
	yield all([
		fork(watchRestaurantsList),
	])
}
