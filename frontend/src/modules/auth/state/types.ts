import { IUser } from './../models/IUser';
/**
 * Action types
 */
export enum ActionTypes {
  LOGIN_REQUEST = '@auth/LOGIN_REQUEST',
  LOGIN_SUCCESS = '@auth/LOGIN_SUCCESS',
  LOGIN_ERROR = '@auth/LOGIN_ERROR',
  GET_ME = '@auth/GET_ME',
  GET_ME_SUCCESS = '@auth/GET_ME_SUCCESS',
  LOGOUT = '@auth/LOGOUT',
  TOGGLE_DRAWER = '@auth/TOGGLE_DRAWER',
}


/**
 * State type
 */
export interface IAuthState {
  readonly loading: boolean
  readonly error: boolean
  readonly user: IUser
  readonly drawerOpen: boolean
}
