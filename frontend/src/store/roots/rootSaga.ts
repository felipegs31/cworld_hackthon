import { all, fork } from 'redux-saga/effects';
import authSaga from '../../modules/auth/state/sagas'
import restaurantsListSaga from '../../modules/campaigns/list/state/sagas'
import restaurantDetailSaga from '../../modules/campaigns/detail/state/sagas'
import usersListSaga from '../../modules/users/list/state/sagas';
import creatorsListSaga from '../../modules/creators/list/state/sagas';



export default function* rootSaga() {
  yield all([
    fork(authSaga),
    fork(restaurantsListSaga),
    fork(restaurantDetailSaga),
    fork(usersListSaga),
    fork(creatorsListSaga),
  ]);
}
