import { IUser } from './../../../auth/models/IUser';
import { IPayload } from './../../../../utils/models/IPayload';
import { Reducer } from 'redux';
import { ActionTypes, IUsersListState } from './types'

export const INITIAL_STATE: IUsersListState = {
	loading: false,
  error: false,
  users: {
    count: 0,
    rows: []
  } as IPayload<IUser[]>,
  page: 1,
  sort: 'name',
  limit: 6,
  searchText: '',
  sortAsc: true
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
    page: 1
  }
}

const usersListChangePage = (state: IUsersListState, {type, payload}: {
  type: string,
  payload: number
}): IUsersListState => {
  return {
    ...state,
    page: payload
  }
}

const usersListChangeSort = (state: IUsersListState, {type, payload}: {
  type: string,
  payload: {sortAsc: boolean, sort: string}
}): IUsersListState => {
  return {
    ...state,
    sortAsc: payload.sortAsc,
    sort: payload.sort
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


		default:
			return state
	}
}
