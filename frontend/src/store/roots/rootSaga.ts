import { all, fork } from 'redux-saga/effects';
import authSaga from '../../modules/auth/state/sagas'
import restaurantsListSaga from '../../modules/restaurants/list/state/sagas'
import restaurantDetailSaga from '../../modules/restaurants/detail/state/sagas'
import usersListSaga from '../../modules/users/list/state/sagas';



export default function* rootSaga() {
  yield all([
    fork(authSaga),
    fork(restaurantsListSaga),
    fork(restaurantDetailSaga),
    fork(usersListSaga),
  ]);
}
