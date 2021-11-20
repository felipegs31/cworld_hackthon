import { IUserData } from './../../users/list/models/IUser';
import { ILogin } from './../models/ILogin';
import { Reducer } from 'redux';
import { IAuthState, ActionTypes } from './types'
import { IUser } from '../models/IUser'

export const INITIAL_STATE: IAuthState = {
	loginError: false,
	loading: false,
  user: {} as IUser,
  drawerOpen: false,
  resetPasswordSent: false,
  getResetPasswordError: false,
  putResetPasswordSuccess: false,
  createAccountSuccess: false,
  getInviteUserError: false,
  inviteUser: {} as IUserData
}

const loginRequest = (state: IAuthState) :IAuthState => {
  return {
    ...state,
    loading: true,
    loginError: false
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
    user: payload.user,
    loginError: false
  }
}

const loginError = (state: IAuthState): IAuthState => {
  return {
    ...state,
    loading: false,
    loginError: true
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

const postResetPassword = (state: IAuthState): IAuthState => {
  return {
    ...state,
    loading: true
  }
}

const postResetPasswordSuccess = (state: IAuthState): IAuthState => {
  return {
    ...state,
    loading: false,
    resetPasswordSent: true
  }
}

const postResetPasswordError = (state: IAuthState): IAuthState => {
  return {
    ...state,
    loading: false,
    resetPasswordSent: false
  }
}

const setResetPasswordSent = (state: IAuthState): IAuthState => {
  return {
    ...state,
    loading: false,
    resetPasswordSent: false
  }
}

const getResetPassword = (state: IAuthState): IAuthState => {
  return {
    ...state,
    loading: true,
    getResetPasswordError: false
  }
}

const getResetPasswordSuccess = (state: IAuthState): IAuthState => {
  return {
    ...state,
    loading: false,
    getResetPasswordError: false
  }
}

const getResetPasswordError = (state: IAuthState): IAuthState => {
  return {
    ...state,
    loading: false,
    getResetPasswordError: true
  }
}

const putResetPassword = (state: IAuthState): IAuthState => {
  return {
    ...state,
    loading: true,
    putResetPasswordSuccess: false
  }
}

const putResetPasswordSuccess = (state: IAuthState): IAuthState => {
  return {
    ...state,
    loading: false,
    putResetPasswordSuccess: true
  }
}

const putResetPasswordError = (state: IAuthState): IAuthState => {
  return {
    ...state,
    loading: false,
    putResetPasswordSuccess: false
  }
}

const createAccount = (state: IAuthState): IAuthState => {
  return {
    ...state,
    loading: true,
    createAccountSuccess: false
  }
}

const createAccountSuccess = (state: IAuthState): IAuthState => {
  return {
    ...state,
    loading: false,
    createAccountSuccess: true
  }
}

const createAccountError = (state: IAuthState): IAuthState => {
  return {
    ...state,
    loading: false,
    createAccountSuccess: false
  }
}

const getInviteUser = (state: IAuthState): IAuthState => {
  return {
    ...state,
    loading: true,
    getInviteUserError: false,
    inviteUser: {} as IUserData
  }
}

const getInviteUserSuccess = (state: IAuthState, {type, payload}: {
  type: string,
  payload: IUserData
} ): IAuthState => {
  return {
    ...state,
    loading: false,
    getInviteUserError: false,
    inviteUser: payload
  }
}

const getInviteUserError = (state: IAuthState): IAuthState => {
  return {
    ...state,
    loading: false,
    getInviteUserError: true,
    inviteUser: {} as IUserData
  }
}

const createAccountInviteUser = (state: IAuthState): IAuthState => {
  return {
    ...state,
    loading: true,
  }
}

const createAccountInviteUserSuccess = (state: IAuthState): IAuthState => {
  return {
    ...state,
    loading: false,
  }
}

const createAccountInviteUserError = (state: IAuthState): IAuthState => {
  return {
    ...state,
    loading: false,
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

    case ActionTypes.POST_RESET_PASSWORD: return postResetPassword(state)
    case ActionTypes.POST_RESET_PASSWORD_SUCCESS: return postResetPasswordSuccess(state)
    case ActionTypes.POST_RESET_PASSWORD_ERROR: return postResetPasswordError(state)
    case ActionTypes.SET_RESET_PASSWORD_SENT: return setResetPasswordSent(state)

    case ActionTypes.GET_RESET_PASSWORD: return getResetPassword(state)
    case ActionTypes.GET_RESET_PASSWORD_SUCCESS: return getResetPasswordSuccess(state)
    case ActionTypes.GET_RESET_PASSWORD_ERROR: return getResetPasswordError(state)

    case ActionTypes.PUT_RESET_PASSWORD: return putResetPassword(state)
    case ActionTypes.PUT_RESET_PASSWORD_SUCCESS: return putResetPasswordSuccess(state)
    case ActionTypes.PUT_RESET_PASSWORD_ERROR: return putResetPasswordError(state)

    case ActionTypes.CREATE_ACCOUNT: return createAccount(state)
    case ActionTypes.CREATE_ACCOUNT_SUCCESS: return createAccountSuccess(state)
    case ActionTypes.CREATE_ACCOUNT_ERROR: return createAccountError(state)

    case ActionTypes.GET_INVITE_USER: return getInviteUser(state)
    case ActionTypes.GET_INVITE_USER_SUCCESS: return getInviteUserSuccess(state, action)
    case ActionTypes.GET_INVITE_USER_ERROR: return getInviteUserError(state)

    case ActionTypes.CREATE_ACCOUNT_INVITE_USER: return createAccountInviteUser(state)
    case ActionTypes.CREATE_ACCOUNT_INVITE_USER_SUCCESS: return createAccountInviteUserSuccess(state)
    case ActionTypes.CREATE_ACCOUNT_INVITE_USER_ERROR: return createAccountInviteUserError(state)

		default:
			return state
	}
}
