import { IUserData } from './../models/IUser';
import { action } from 'typesafe-actions'
import { ActionTypes } from './types'
import { IPayload } from '../../../../utils/models/IPayload';
import { IUser } from '../models/IUser';

export const usersListRequest = () => {
	return action(ActionTypes.USERS_LIST_REQUEST)
}

export const usersListSuccess = (data: IPayload<IUser[]>) =>
  action(ActionTypes.USERS_LIST_SUCCESS, data)

export const usersListError = (message: string) =>
	action(ActionTypes.USERS_LIST_ERROR, message)

export const usersListChangeLimit = (limit: number) =>
	action(ActionTypes.USERS_LIST_CHANGE_LIMIT, limit)

export const usersListChangePage = (page: number) =>
	action(ActionTypes.USERS_LIST_CHANGE_PAGE, page)

export const usersListChangeSort = (sortAsc: boolean, sort:string) =>
	action(ActionTypes.USERS_LIST_CHANGE_SORT, {sortAsc, sort})

export const usersListChangeSearchText = (text: string) =>
	action(ActionTypes.USERS_LIST_CHANGE_SEARCH_TEXT, text)

// Open modal User
export const openUserModal = (user?: IUser) =>
  action(ActionTypes.OPEN_USER_MODAL, user)

export const closeUserModal = () =>
  action(ActionTypes.CLOSE_USER_MODAL)


// Submit User
export const postInviteUser = (user: IUserData) =>
  action(ActionTypes.POST_INVITE_USER, user)

export const postInviteUserSuccess = () =>
  action(ActionTypes.POST_INVITE_USER_SUCCESS)

export const postInviteUserError = () =>
  action(ActionTypes.POST_INVITE_USER_ERROR)

export const putUser = (user: IUserData) =>
  action(ActionTypes.PUT_USER, user)

export const putUserSuccess = () =>
  action(ActionTypes.PUT_USER_SUCCESS)

export const putUserError = () =>
  action(ActionTypes.PUT_USER_ERROR)

export const deleteUser = () =>
  action(ActionTypes.DELETE_USER)

export const deleteUserSuccess = () =>
  action(ActionTypes.DELETE_USER_SUCCESS)

export const deleteUserError = () =>
  action(ActionTypes.DELETE_USER_ERROR)
