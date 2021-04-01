import { IUserData } from './../../users/list/models/IUser';
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

  POST_RESET_PASSWORD = '@auth/POST_RESET_PASSWORD',
  POST_RESET_PASSWORD_SUCCESS = '@auth/POST_RESET_PASSWORD_SUCCESS',
  POST_RESET_PASSWORD_ERROR = '@auth/POST_RESET_PASSWORD_ERROR',
  SET_RESET_PASSWORD_SENT = '@auth/SET_RESET_PASSWORD_SENT',

  GET_RESET_PASSWORD = '@auth/GET_RESET_PASSWORD',
  GET_RESET_PASSWORD_SUCCESS = '@auth/GET_RESET_PASSWORD_SUCCESS',
  GET_RESET_PASSWORD_ERROR = '@auth/GET_RESET_PASSWORD_ERROR',

  PUT_RESET_PASSWORD = '@auth/PUT_RESET_PASSWORD',
  PUT_RESET_PASSWORD_SUCCESS = '@auth/PUT_RESET_PASSWORD_SUCCESS',
  PUT_RESET_PASSWORD_ERROR = '@auth/PUT_RESET_PASSWORD_ERROR',

  CREATE_ACCOUNT = '@auth/CREATE_ACCOUNT',
  CREATE_ACCOUNT_SUCCESS = '@auth/CREATE_ACCOUNT_SUCCESS',
  CREATE_ACCOUNT_ERROR = '@auth/CREATE_ACCOUNT_ERROR',

  GET_INVITE_USER = '@auth/GET_INVITE_USER',
  GET_INVITE_USER_SUCCESS = '@auth/GET_INVITE_USER_SUCCESS',
  GET_INVITE_USER_ERROR = '@auth/GET_INVITE_USER_ERROR',

  CREATE_ACCOUNT_INVITE_USER = '@auth/CREATE_ACCOUNT_INVITE_USER',
  CREATE_ACCOUNT_INVITE_USER_SUCCESS = '@auth/CREATE_ACCOUNT_INVITE_USER_SUCCESS',
  CREATE_ACCOUNT_INVITE_USER_ERROR = '@auth/CREATE_ACCOUNT_INVITE_USER_ERROR',

}


/**
 * State type
 */
export interface IAuthState {
  readonly loading: boolean
  readonly loginError: boolean
  readonly user: IUser
  readonly drawerOpen: boolean

  readonly resetPasswordSent: boolean

  readonly getResetPasswordError: boolean

  readonly putResetPasswordSuccess: boolean

  readonly createAccountSuccess: boolean

  readonly getInviteUserError: boolean
  readonly inviteUser: IUserData

}
