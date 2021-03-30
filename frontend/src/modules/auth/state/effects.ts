import { IUser } from './../models/IUser';
import { ILogin } from './../models/ILogin';
import { call } from 'redux-saga/effects'
import { put } from 'redux-saga/effects'
import API from './../../../services/api'
import { getMeSuccess, loginError, loginSuccess } from './actions'
import history from '../../../History';

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


const setAuthToken = (token: string): any => {
  return localStorage.setItem('token', token)
}
