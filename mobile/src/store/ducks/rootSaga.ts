import { takeLatest, all } from 'redux-saga/effects';

import { LocationTypes } from './location/types';
import { setLocationSaga } from './location/sagas';

export default function* rootSaga() {
  return yield all([
    takeLatest(LocationTypes.SET_LOCATION_REQUEST, setLocationSaga)
  ]);
}
