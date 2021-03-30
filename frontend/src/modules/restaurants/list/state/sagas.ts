import { ActionTypes } from './types'
import { all, fork, takeLatest } from 'redux-saga/effects'
import { handleRestaurantsListRequest } from './effects'


/**
 * @desc Watches every specified action and runs effect method and passes action args to it
 */
function* watchRestaurantsList(): Generator {
  yield takeLatest(ActionTypes.RESTAURANTS_LIST_REQUEST, handleRestaurantsListRequest)
}


/**
 * @desc saga init, forks in effects, other sagas
 */
export default function* restaurantsListSaga() {
	yield all([
		fork(watchRestaurantsList),
	])
}
