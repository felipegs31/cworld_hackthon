import { ActionTypes } from './types'
import { all, fork, takeLatest } from 'redux-saga/effects'
import { handleGetMe, handleLogin, handleLogout } from './effects'


/**
 * @desc Watches every specified action and runs effect method and passes action args to it
 */
function* watchAuth(): Generator {
  yield takeLatest(ActionTypes.LOGIN_REQUEST, handleLogin)
	yield takeLatest(ActionTypes.GET_ME, handleGetMe)
	yield takeLatest(ActionTypes.LOGOUT, handleLogout)
}


/**
 * @desc saga init, forks in effects, other sagas
 */
export default function* authSaga() {
	yield all([
		fork(watchAuth),
	])
}
