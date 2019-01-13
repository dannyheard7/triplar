export const GET_TRIPS_REQUEST = 'GET_TRIPS_REQUEST';
export const GET_TRIPS_SUCCESS = 'GET_TRIPS_SUCCESS';
export const GET_TRIPS_FAILURE = 'GET_TRIPS_FAILURE';

export const CREATE_TRIP_REQUEST = 'CREATE_TRIP_REQUEST';
export const CREATE_TRIP_SUCCESS = 'CREATE_TRIP_SUCCESS';
export const CREATE_TRIP_FAILURE = 'CREATE_TRIP_FAILURE';

export const EDIT_TRIP_REQUEST = 'EDIT_TRIP_REQUEST';
export const EDIT_TRIP_SUCCESS = 'EDIT_TRIP_SUCCESS';
export const EDIT_TRIP_FAILURE = 'EDIT_TRIP_FAILURE';

export const DELETE_TRIP_REQUEST = 'DELETE_TRIP_REQUEST';
export const DELETE_TRIP_SUCCESS = 'DELETE_TRIP_SUCCESS';
export const DELETE_TRIP_FAILURE = 'DELETE_TRIP_FAILURE';


export function getTrips() {return {type: GET_TRIPS_REQUEST}}
export function createTrip(trip) {return {type: CREATE_TRIP_REQUEST, trip}}
export function editTrip(tripId, trip) {return {type: EDIT_TRIP_REQUEST, tripId, trip}}
export function deleteTrip(tripId) {return {type: DELETE_TRIP_REQUEST, tripId}}