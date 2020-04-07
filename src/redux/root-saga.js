import { call, all } from 'redux-saga/effects';

import { userSaga } from './user/user.saga';
// import { workersSaga } from './workers/workers.saga';

export default function* rootSaga() {
	yield all([call(userSaga)]);
}
