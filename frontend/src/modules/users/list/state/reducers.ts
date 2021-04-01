import { IUser } from './../../../auth/models/IUser';
import { IPayload } from './../../../../utils/models/IPayload';
import { Reducer } from 'redux';
import { ActionTypes, IUsersListState } from './types'
import { isEmpty } from 'lodash';

export const INITIAL_STATE: IUsersListState = {
	loading: false,
  error: false,
  users: {
    count: 0,
    rows: []
  } as IPayload<IUser[]>,
  page: 1,
  sort: 'name',
  limit: 5,
  searchText: '',
  sortAsc: true,
  userModalOpen: false,
  userModalLoading: false,
  userToEdit: {} as IUser
}

const usersListRequest = (state: IUsersListState) :IUsersListState => {
  return {
    ...state,
    loading: true
  }
}

const usersListSuccess = (state: IUsersListState, {type, payload}: {
  type: string,
  payload: IPayload<IUser[]>
} ): IUsersListState => {
  return {
    ...state,
    loading: false,
    users: payload
  }
}

const usersListError = (state: IUsersListState): IUsersListState => {
  return {
    ...state,
    loading: false
  }
}

const usersListChangeLimit = (state: IUsersListState, {type, payload}: {
  type: string,
  payload: number
}): IUsersListState => {
  return {
    ...state,
    limit: payload,
    page: 1,
    loading: true
  }
}

const usersListChangePage = (state: IUsersListState, {type, payload}: {
  type: string,
  payload: number
}): IUsersListState => {
  return {
    ...state,
    page: payload,
    loading: true
  }
}

const usersListChangeSort = (state: IUsersListState, {type, payload}: {
  type: string,
  payload: {sortAsc: boolean, sort: string}
}): IUsersListState => {
  return {
    ...state,
    sortAsc: payload.sortAsc,
    sort: payload.sort,
    loading: true,
    page: 1
  }
}

const usersListChangeSearchText = (state: IUsersListState, {type, payload}: {
  type: string,
  payload: string
}): IUsersListState => {
  return {
    ...state,
    loading: true,
    searchText: payload,
    page: 1
  }
}

const openUserModal = (state: IUsersListState, {type, payload}: {
  type: string,
  payload: IUser
} ): IUsersListState => {

  return {
    ...state,
    userModalOpen: true,
    userToEdit: !isEmpty(payload) ? payload : {} as IUser
  }
}

const closeUserModal = (state: IUsersListState): IUsersListState => {
  return {
    ...state,
    userModalOpen: false,
    userToEdit: {} as IUser
  }
}

const postInviteUser = (state: IUsersListState): IUsersListState => {
  return {
    ...state,
    userModalLoading: true,
  }
}

const postInviteUserSuccess = (state: IUsersListState): IUsersListState => {
  return {
    ...state,
    userModalLoading: false,
    userModalOpen: false
  }
}

const postInviteUserError = (state: IUsersListState): IUsersListState => {
  return {
    ...state,
    userModalLoading: false
  }
}

const putUser = (state: IUsersListState): IUsersListState => {
  return {
    ...state,
    userModalLoading: true,
  }
}

const putUserSuccess = (state: IUsersListState): IUsersListState => {
  return {
    ...state,
    userModalOpen: false,
    userModalLoading: false,
    userToEdit: {} as IUser,
    loading: true
  }
}

const putUserError = (state: IUsersListState): IUsersListState => {
  return {
    ...state,
    userModalLoading: false
  }
}

const deleteUser = (state: IUsersListState): IUsersListState => {
  return {
    ...state,
    userModalLoading: true,
  }
}

const deleteUserSuccess = (state: IUsersListState): IUsersListState => {
  let page = state.page
  if (state.users.rows.length === 1) {
    page = page > 1 ? page - 1 : 1
  }

  return {
    ...state,
    userModalOpen: false,
    userModalLoading: false,
    userToEdit: {} as IUser,
    page,
    loading: true
  }
}

const deleteUserError = (state: IUsersListState): IUsersListState => {
  return {
    ...state,
    userModalLoading: false
  }
}

export const usersListReducer: Reducer<IUsersListState> = (
	state: IUsersListState = INITIAL_STATE,
	action: any
): IUsersListState => {
	switch (action.type) {
		case ActionTypes.USERS_LIST_REQUEST: return usersListRequest(state)
		case ActionTypes.USERS_LIST_SUCCESS: return usersListSuccess(state, action)
		case ActionTypes.USERS_LIST_ERROR: return usersListError(state)

		case ActionTypes.USERS_LIST_CHANGE_LIMIT: return usersListChangeLimit(state, action)
		case ActionTypes.USERS_LIST_CHANGE_PAGE: return usersListChangePage(state, action)
		case ActionTypes.USERS_LIST_CHANGE_SORT: return usersListChangeSort(state, action)
		case ActionTypes.USERS_LIST_CHANGE_SEARCH_TEXT: return usersListChangeSearchText(state, action)


    case ActionTypes.OPEN_USER_MODAL: return openUserModal(state, action)
		case ActionTypes.CLOSE_USER_MODAL: return closeUserModal(state)

    case ActionTypes.POST_INVITE_USER: return postInviteUser(state)
		case ActionTypes.POST_INVITE_USER_SUCCESS: return postInviteUserSuccess(state)
		case ActionTypes.POST_INVITE_USER_ERROR: return postInviteUserError(state)

		case ActionTypes.PUT_USER: return putUser(state)
		case ActionTypes.PUT_USER_SUCCESS: return putUserSuccess(state)
		case ActionTypes.PUT_USER_ERROR: return putUserError(state)

		case ActionTypes.DELETE_USER: return deleteUser(state)
		case ActionTypes.DELETE_USER_SUCCESS: return deleteUserSuccess(state)
		case ActionTypes.DELETE_USER_ERROR: return deleteUserError(state)


		default:
			return state
	}
}
