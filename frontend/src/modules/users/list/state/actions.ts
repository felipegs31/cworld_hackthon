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


