import { ActionTypes } from './types'
import { all, fork, takeLatest } from 'redux-saga/effects'
import { handleUsersListRequest } from './effects'


/**
 * @desc Watches every specified action and runs effect method and passes action args to it
 */
function* watchUsersList(): Generator {
  yield takeLatest([ActionTypes.USERS_LIST_REQUEST,
                    ActionTypes.USERS_LIST_CHANGE_LIMIT,
                    ActionTypes.USERS_LIST_CHANGE_PAGE,
                    ActionTypes.USERS_LIST_CHANGE_SORT], handleUsersListRequest)
}


/**
 * @desc saga init, forks in effects, other sagas
 */
export default function* usersListSaga() {
	yield all([
		fork(watchUsersList),
	])
}
