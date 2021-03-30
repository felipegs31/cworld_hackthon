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

