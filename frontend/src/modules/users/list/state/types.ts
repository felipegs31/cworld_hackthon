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
  USERS_LIST_CHANGE_SEARCH_TEXT = '@users_list/USERS_LIST_CHANGE_SEARCH_TEXT',

  OPEN_USER_MODAL = '@users_list/OPEN_USER_MODAL',
  CLOSE_USER_MODAL = '@users_list/CLOSE_USER_MODAL',

  POST_INVITE_USER = '@users_list/POST_INVITE_USER',
  POST_INVITE_USER_SUCCESS = '@users_list/POST_INVITE_USER_SUCCESS',
  POST_INVITE_USER_ERROR = '@users_list/POST_INVITE_USER_ERROR',

  PUT_USER = '@users_list/PUT_USER',
  PUT_USER_SUCCESS = '@users_list/PUT_USER_SUCCESS',
  PUT_USER_ERROR = '@users_list/PUT_USER_ERROR',

  DELETE_USER = '@users_list/DELETE_USER',
  DELETE_USER_SUCCESS = '@users_list/DELETE_USER_SUCCESS',
  DELETE_USER_ERROR = '@users_list/DELETE_USER_ERROR',

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

  readonly userModalOpen: boolean
  readonly userModalLoading: boolean
  readonly userToEdit: IUser
}

