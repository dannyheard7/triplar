export const GET_TRIPS = 'GET_TRIPS';
export const GET_TRIPS_SUCCESS = 'GET_TRIPS_SUCCESS';
export const GET_TRIPS_FAILURE = 'GET_TRIPS_FAILURE';

export const CREATE_TRIP = 'CREATE_TRIP';
export const CREATE_TRIP_SUCCESS = 'CREATE_TRIP_SUCCESS';
export const CREATE_TRIP_FAILURE = 'CREATE_TRIP_FAILURE';

export const EDIT_TRIP = 'EDIT_TRIP';
export const EDIT_TRIP_SUCCESS = 'EDIT_TRIP_SUCCESS';
export const EDIT_TRIP_FAILURE = 'EDIT_TRIP_FAILURE';

export const DELETE_TRIP = 'DELETE_TRIP';
export const DELETE_TRIP_SUCCESS = 'DELETE_TRIP_SUCCESS';
export const DELETE_TRIP_FAILURE = 'DELETE_TRIP_FAILURE';


export function getTrips() {return {type: GET_TRIPS}}
export function createTrip(trip) {return {type: CREATE_TRIP, trip}}
export function editTrip(tripId, trip) {return {type: EDIT_TRIP, tripId, trip}}
export function deleteTrip(tripId) {return {type: DELETE_TRIP, tripId}}