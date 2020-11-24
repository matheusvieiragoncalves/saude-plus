import { action } from 'typesafe-actions';
import { LocationTypes, Location } from './types';

export const setLocationRequest = (data: Location) => {
  return action(LocationTypes.SET_LOCATION_REQUEST, data);
};

export const setLocationSuccess = (data: Location) => {
  return action(LocationTypes.SET_LOCATION_SUCCESS, data);
};
