import { ILogin } from './../models/ILogin';
import { Reducer } from 'redux';
import { IAuthState, ActionTypes } from './types'
import { IUser } from '../models/IUser'

export const INITIAL_STATE: IAuthState = {
	error: false,
	loading: false,
  user: {} as IUser,
  drawerOpen: false
}

const loginRequest = (state: IAuthState) :IAuthState => {
  return {
    ...state,
    loading: true
  }
}

const logout = (state: IAuthState) :IAuthState => {
  return {
    ...state,
    ...INITIAL_STATE
  }
}

const loginSuccess = (state: IAuthState, {type, payload}: {
  type: string,
  payload: ILogin
} ): IAuthState => {
  return {
    ...state,
    loading: false,
    user: payload.user
  }
}

const loginError = (state: IAuthState): IAuthState => {
  return {
    ...state,
    loading: false
  }
}

const getMeSuccess = (state: IAuthState, {type, payload}: {
  type: string,
  payload: IUser
} ): IAuthState => {
  return {
    ...state,
    loading: false,
    user: payload
  }
}

const toggleDrawer = (state: IAuthState): IAuthState => {
  return {
    ...state,
    drawerOpen: !state.drawerOpen
  }
}


export const authReducer: Reducer<IAuthState> = (
	state: IAuthState = INITIAL_STATE,
	action: any
): IAuthState => {
	switch (action.type) {
		case ActionTypes.LOGIN_REQUEST: return loginRequest(state)
		case ActionTypes.LOGOUT: return logout(state)
		case ActionTypes.LOGIN_SUCCESS: return loginSuccess(state, action)
		case ActionTypes.LOGIN_ERROR: return loginError(state)
    case ActionTypes.GET_ME_SUCCESS: return getMeSuccess(state, action)
    case ActionTypes.TOGGLE_DRAWER: return toggleDrawer(state)

		default:
			return state
	}
}
