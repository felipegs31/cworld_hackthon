import { IUserData } from './../../users/list/models/IUser';
import { ILogin } from './../models/ILogin'
import { IUser } from '../models/IUser';
import { action } from 'typesafe-actions'
import { ActionTypes } from './types'

export const login = (email: string, password: string) => {
	return action(ActionTypes.LOGIN_REQUEST, { email, password })
}

export const loginSuccess = (data: ILogin) =>
  action(ActionTypes.LOGIN_SUCCESS, data)

export const loginError = (message: string) =>
	action(ActionTypes.LOGIN_ERROR, message)

export const getMe = () =>
	action(ActionTypes.GET_ME)

export const getMeSuccess = (data: IUser) =>
  action(ActionTypes.GET_ME_SUCCESS, data )

export const logout = () =>
  action(ActionTypes.LOGOUT)

export const toggleDrawer = () =>
  action(ActionTypes.TOGGLE_DRAWER)


// Reset Password

export const setResetPasswordSent = () =>
  action(ActionTypes.SET_RESET_PASSWORD_SENT)

export const postResetPassword = (email: string) =>
  action(ActionTypes.POST_RESET_PASSWORD, email)

export const postResetPasswordSuccess = () =>
  action(ActionTypes.POST_RESET_PASSWORD_SUCCESS)

export const postResetPasswordError = () =>
  action(ActionTypes.POST_RESET_PASSWORD_ERROR)


export const getResetPassword = () =>
  action(ActionTypes.GET_RESET_PASSWORD)

export const getResetPasswordSuccess = () =>
  action(ActionTypes.GET_RESET_PASSWORD_SUCCESS)

export const getResetPasswordError = () =>
  action(ActionTypes.GET_RESET_PASSWORD_ERROR)


export const putResetPassword = (password: string) =>
  action(ActionTypes.PUT_RESET_PASSWORD, password)

export const putResetPasswordSuccess = () =>
  action(ActionTypes.PUT_RESET_PASSWORD_SUCCESS)

export const putResetPasswordError = () =>
  action(ActionTypes.PUT_RESET_PASSWORD_ERROR)


export const createAccount = (name: string, email: string, password: string) =>
  action(ActionTypes.CREATE_ACCOUNT, {name, email, password})

export const createAccountSuccess = () =>
  action(ActionTypes.CREATE_ACCOUNT_SUCCESS)

export const createAccountError = () =>
  action(ActionTypes.CREATE_ACCOUNT_ERROR)


export const getInviteUser = () =>
  action(ActionTypes.GET_INVITE_USER)

export const getInviteUserSuccess = (data: IUserData) =>
  action(ActionTypes.GET_INVITE_USER_SUCCESS, data)

export const getInviteUserError = () =>
  action(ActionTypes.GET_INVITE_USER_ERROR)


export const createAccountInviteUser = (password: string) =>
  action(ActionTypes.CREATE_ACCOUNT_INVITE_USER, password)

export const createAccountInviteUserSuccess = () =>
  action(ActionTypes.CREATE_ACCOUNT_INVITE_USER_SUCCESS)

export const createAccountInviteUserError = () =>
  action(ActionTypes.CREATE_ACCOUNT_INVITE_USER_ERROR)
