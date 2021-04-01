import { ActionTypes } from './types'
import { all, fork, takeLatest } from 'redux-saga/effects'
import { handleDeleteUser,
         handlePostInviteUser,
         handlePutUser,
         handleUsersListRequest } from './effects'


/**
 * @desc Watches every specified action and runs effect method and passes action args to it
 */
function* watchUsersList(): Generator {
  yield takeLatest([ActionTypes.USERS_LIST_REQUEST,
                    ActionTypes.USERS_LIST_CHANGE_LIMIT,
                    ActionTypes.USERS_LIST_CHANGE_PAGE,
                    ActionTypes.USERS_LIST_CHANGE_SORT,
                    ActionTypes.PUT_USER_SUCCESS,
                    ActionTypes.DELETE_USER_SUCCESS,
                    ActionTypes.USERS_LIST_CHANGE_SEARCH_TEXT], handleUsersListRequest)


  yield takeLatest(ActionTypes.POST_INVITE_USER, handlePostInviteUser)
  yield takeLatest(ActionTypes.PUT_USER, handlePutUser)
  yield takeLatest(ActionTypes.DELETE_USER, handleDeleteUser)

}


/**
 * @desc saga init, forks in effects, other sagas
 */
export default function* usersListSaga() {
	yield all([
		fork(watchUsersList),
	])
}
