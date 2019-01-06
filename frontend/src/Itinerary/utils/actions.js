export const GET_TRIP_ITINERARIES = 'GET_TRIP_ITINERARIES';
export const GET_TRIP_ITINERARIES_SUCCESS = 'GET_TRIP_ITINERARIES_SUCCESS';
export const GET_TRIP_ITINERARIES_FAILURE = 'GET_TRIP_ITINERARIES_FAILURE';

export const GET_ITINERARY_DAY_ITEMS = 'GET_ITINERARY_DAY_ITEMS';
export const GET_ITINERARY_DAY_ITEMS_SUCCESS = 'GET_ITINERARY_DAY_ITEMS_SUCCESS';
export const GET_ITINERARY_DAY_ITEMS_FAILURE = 'GET_ITINERARY_DAY_ITEMS_FAILURE';

export const ADD_TRIP_LOCATION = 'ADD_TRIP_LOCATION';
export const ADD_TRIP_LOCATION_SUCCESS = 'ADD_TRIP_LOCATION_SUCCESS';
export const ADD_TRIP_LOCATION_FAILURE = 'ADD_TRIP_LOCATION_FAILURE';

export const DELETE_TRIP_LOCATION = 'DELETE_TRIP_LOCATION';
export const DELETE_TRIP_LOCATION_SUCCESS = 'DELETE_TRIP_LOCATION_SUCCESS';
export const DELETE_TRIP_LOCATION_FAILURE = 'DELETE_TRIP_LOCATION_FAILURE';

export const ADD_ITEM_TO_ITINERARY_DAY = 'ADD_ITEM_TO_ITINERARY_DAY';
export const ADD_ITEM_TO_ITINERARY_DAY_SUCCESS = 'ADD_ITEM_TO_ITINERARY_DAY_SUCCESS';
export const ADD_ITEM_TO_ITINERARY_DAY_FAILURE = 'ADD_ITEM_TO_ITINERARY_DAY_FAILURE';

export const REMOVE_ITEM_FROM_ITINERARY_DAY = 'REMOVE_ITEM_FROM_ITINERARY_DAY';
export const REMOVE_ITEM_FROM_ITINERARY_DAY_SUCCESS = 'REMOVE_ITEM_FROM_ITINERARY_DAY_SUCCESS';
export const REMOVE_ITEM_FROM_ITINERARY_DAY_FAILURE = 'REMOVE_ITEM_FROM_ITINERARY_DAY_FAILURE';


export function getTripItineraries(tripId) {return {type: GET_TRIP_ITINERARIES, tripId}}
export function getItineraryDayDetail(itineraryId, date) {return {type: GET_ITINERARY_DAY_ITEMS, itineraryId, date}}

export function addTripLocation(tripId, location) {return {type: ADD_TRIP_LOCATION, tripId, location}}
export function deleteTripLocation(locationId, tripId) {return {type: DELETE_TRIP_LOCATION, locationId, tripId}}

export function addItemToItineraryDay(itineraryId, placeId, day, position) {
    return {type: ADD_ITEM_TO_ITINERARY_DAY, itineraryId, placeId, day, position}
}

export function removeItemFromItineraryDay(itineraryId, placeId, day) {
    return {type: REMOVE_ITEM_FROM_ITINERARY_DAY, itineraryId, placeId, day}
}