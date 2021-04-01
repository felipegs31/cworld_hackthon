import { IUserData } from './../../users/list/models/IUser';
import { IUser } from './../models/IUser';
import { ILogin } from './../models/ILogin';
import { call } from 'redux-saga/effects'
import { put } from 'redux-saga/effects'
import API from './../../../services/api'
import { getMeSuccess,
         getResetPasswordError,
         getResetPasswordSuccess,
         loginError,
         loginSuccess,
         postResetPasswordError,
         postResetPasswordSuccess,
         putResetPasswordSuccess,
         putResetPasswordError,
         createAccountSuccess,
         createAccountError,
         getInviteUserSuccess,
         getInviteUserError,
         createAccountInviteUserSuccess,
         createAccountInviteUserError } from './actions'
import history from '../../../History';
import History from '../../../History';

export function* handleLogin({type, payload}: {
  type: string,
  payload: { email: string, password: string }
}): Generator {
	try {
    const headers = {
      "Authorization": "Basic " + btoa(`${payload.email}:${payload.password}`)
    }
    const res: any = yield API.post('auth', null, { headers: headers })
    const data: ILogin = res.data
		yield put(loginSuccess(data))
    yield setAuthToken(data.token)
    yield call(history.push, '/')


	} catch (err) {
		if (err instanceof Error) {
			yield put(loginError(err.stack!))
		} else {
			yield put(loginError('An unknown error occured.'))
		}
	}
}


export function* handleGetMe(): Generator {

  try {
    const res: any = yield API.get('users/me')
    const data: IUser = res.data
    yield put(getMeSuccess(data))
    yield call(history.push, '/')

  } catch (err) {
    localStorage.removeItem('token');
    yield call(history.push, '/login')
  }
}

export function* handleLogout(): Generator {
  localStorage.removeItem('token');
  yield call(history.push, '/login')
}

export function* handleResetPassword({type, payload}: {
  type: string,
  payload: string
}): Generator {
  try {
    const res: any = yield API.post('passwordresets', {email: payload})
    yield put(postResetPasswordSuccess())
  } catch (err) {
    yield put(postResetPasswordError())
  }

}

export function* handleGetResetPassword({type}: {
  type: string
}): Generator {
  try {
    let { pathname } = History.location
    pathname = pathname.replace("/resetpassword", "");
    const res: any = yield API.get(`passwordresets${pathname}`)
    yield put(getResetPasswordSuccess())
  } catch (err) {
    yield put(getResetPasswordError())
  }
}

export function* handlePutResetPassword({type, payload}: {
  type: string,
  payload: string
}): Generator {
  try {
    let { pathname } = History.location
    pathname = pathname.replace("/resetpassword", "");
    const res: any = yield API.put(`passwordresets${pathname}`, {password: payload})
    yield put(putResetPasswordSuccess())
  } catch (err) {
    yield put(putResetPasswordError())
  }

}

export function* handleCreateAccount({type, payload}: {
  type: string,
  payload: {email: string, name: string, password: string}
}): Generator {
  try {
    const res: any = yield API.post(`users`, payload)
    const data: ILogin = res.data
    yield put(createAccountSuccess())
    yield setAuthToken(data.token)
    yield call(history.push, '/')
  } catch (err) {
    yield put(createAccountError())
  }

}

export function* handleGetInviteUser({type}: {
  type: string
}): Generator {
  try {
    let { pathname } = History.location
    pathname = pathname.replace("/inviteuser", "");
    const res: any = yield API.get(`inviteuser${pathname}`)
    const data: IUserData = res.data
    yield put(getInviteUserSuccess(data))
  } catch (err) {
    yield put(getInviteUserError())
  }
}

export function* handleCreateAccountInviteUser({type, payload}: {
  type: string,
  payload: string
}): Generator {
  try {
    let { pathname } = History.location
    pathname = pathname.replace("/inviteuser", "");
    const res: any = yield API.put(`inviteuser${pathname}`, {password: payload})
    const data: ILogin = res.data
    yield put(createAccountInviteUserSuccess())
    yield setAuthToken(data.token)
    yield call(history.push, '/')
  } catch (err) {
    yield put(createAccountInviteUserError())
  }

}


const setAuthToken = (token: string): any => {
  return localStorage.setItem('token', token)
}
