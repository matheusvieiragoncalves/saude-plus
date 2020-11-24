import { put } from 'redux-saga/effects';

import { setLocationSuccess } from './actions';

export function* setLocationSaga({
  payload
}: ReturnType<typeof setLocationSuccess>) {
  yield put(setLocationSuccess(payload));
}
