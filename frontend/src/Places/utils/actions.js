export const GET_POPULAR_PLACES_REQUEST = 'GET_POPULAR_PLACES_REQUEST';
export const GET_POPULAR_PLACES_SUCCESS = 'GET_POPULAR_PLACES_SUCCESS';
export const GET_POPULAR_PLACES_FAILURE = 'GET_POPULAR_PLACES_FAILURE';

export const GET_PLACE_DETAILS_REQUEST = 'GET_PLACE_DETAILS_REQUEST';
export const GET_PLACE_DETAILS_SUCCESS = 'GET_PLACE_DETAILS_SUCCESS';
export const GET_PLACE_DETAILS_FAILURE = 'GET_PLACE_DETAILS_FAILURE';

export const GET_TOP_LEVEL_CATEGORIES_REQUEST = 'GET_TOP_LEVEL_CATEGORIES_REQUEST';
export const GET_TOP_LEVEL_CATEGORIES_SUCCESS = 'GET_TOP_LEVEL_CATEGORIES_SUCCESS';
export const GET_TOP_LEVEL_CATEGORIES_FAILURE = 'GET_TOP_LEVEL_CATEGORIES_FAILURE';

export const UPDATE_PLACES_SUCCESS = 'UPDATE_PLACES_SUCCESS';

export function getPopularPlaces(lat, lng, category) {return {type: GET_POPULAR_PLACES_REQUEST, lat, lng, category}}

export function getPlaceDetail(placeId) {return {type: GET_PLACE_DETAILS_REQUEST, placeId}}

export function getTopLevelCategories() {return {type: GET_TOP_LEVEL_CATEGORIES_REQUEST}}