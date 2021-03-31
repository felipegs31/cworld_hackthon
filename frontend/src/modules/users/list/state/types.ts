import { IUser } from './../../../auth/models/IUser';
import { IPayload } from '../../../../utils/models/IPayload';
/**
 * Action types
 */
export enum ActionTypes {
  USERS_LIST_REQUEST = '@users_list/USERS_LIST_REQUEST',
  USERS_LIST_SUCCESS = '@users_list/USERS_LIST_SUCCESS',
  USERS_LIST_ERROR = '@users_list/USERS_LIST_ERROR',

  USERS_LIST_CHANGE_LIMIT = '@users_list/USERS_LIST_CHANGE_LIMIT',
  USERS_LIST_CHANGE_PAGE = '@users_list/USERS_LIST_CHANGE_PAGE',
  USERS_LIST_CHANGE_SORT = '@users_list/USERS_LIST_CHANGE_SORT',

}


/**
 * State type
 */
export interface IUsersListState {
  readonly loading: boolean
  readonly error: boolean
  readonly users: IPayload<IUser[]>
  readonly page: number
  readonly sort: string
  readonly limit: number
  readonly searchText: string
  readonly sortAsc: boolean
}

