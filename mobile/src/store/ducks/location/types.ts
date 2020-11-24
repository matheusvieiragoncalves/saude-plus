/**
 * Action types
 */
export enum LocationTypes {
  SET_LOCATION_REQUEST = '@location/SET_LOCATION_REQUEST',
  SET_LOCATION_SUCCESS = '@location/SET_LOCATION_SUCCESS'
}

/**
 * Data types
 */

export interface Location {
  uf: string;
  city: string;
}

/**
 * State type
 */

export interface LocationState {
  readonly data: Location;
}
