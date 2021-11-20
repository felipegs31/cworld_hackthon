import { ActionTypes } from './types'
import { all, fork, takeLatest } from 'redux-saga/effects'
import { handleGetMe,
         handleLogin,
         handleLogout,
         handleResetPassword,
         handleGetResetPassword,
         handlePutResetPassword,
         handleCreateAccount,
         handleGetInviteUser,
         handleCreateAccountInviteUser } from './effects'


/**
 * @desc Watches every specified action and runs effect method and passes action args to it
 */
function* watchAuth(): Generator {
  yield takeLatest(ActionTypes.LOGIN_REQUEST, handleLogin)
	yield takeLatest(ActionTypes.GET_ME, handleGetMe)
	yield takeLatest(ActionTypes.LOGOUT, handleLogout)
}


function* watchResetPassword(): Generator {
  yield takeLatest(ActionTypes.POST_RESET_PASSWORD, handleResetPassword)
  yield takeLatest(ActionTypes.GET_RESET_PASSWORD, handleGetResetPassword)
  yield takeLatest(ActionTypes.PUT_RESET_PASSWORD, handlePutResetPassword)
}

function* watchCreateAccount(): Generator {
  yield takeLatest(ActionTypes.CREATE_ACCOUNT, handleCreateAccount)
}

function* watchInviteUser(): Generator {
  yield takeLatest(ActionTypes.GET_INVITE_USER, handleGetInviteUser)
  yield takeLatest(ActionTypes.CREATE_ACCOUNT_INVITE_USER, handleCreateAccountInviteUser)
}


/**
 * @desc saga init, forks in effects, other sagas
 */
export default function* authSaga() {
	yield all([
		fork(watchAuth),
		fork(watchResetPassword),
		fork(watchCreateAccount),
		fork(watchInviteUser)
	])
}
