import { Reducer } from 'redux';
import store from '../..';
import { LocationState, LocationTypes } from './types';

const INITIAL_STATE: LocationState = {
  data: { city: '', uf: '' }
};

const reducer: Reducer<LocationState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LocationTypes.SET_LOCATION_SUCCESS:
      if (!action.payload) {
        return state;
      }

      return {
        data: { ...action.payload }
      };

    default:
      return state;
  }
};

export default reducer;
