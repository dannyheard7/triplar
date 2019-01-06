import {call, put, takeEvery} from 'redux-saga/effects'
import Moment from "moment";

import itineraryApi from "../../Itinerary/utils/itinerary.api";
import {
    ADD_ITEM_TO_ITINERARY_DAY,
    ADD_ITEM_TO_ITINERARY_DAY_FAILURE,
    ADD_ITEM_TO_ITINERARY_DAY_SUCCESS,
    ADD_LOCATION_TO_TRIP,
    ADD_LOCATION_TO_TRIP_FAILURE,
    ADD_LOCATION_TO_TRIP_SUCCESS,
    GET_ITINERARY_DAY_ITEMS,
    GET_ITINERARY_DAY_ITEMS_FAILURE,
    GET_ITINERARY_DAY_ITEMS_SUCCESS,
    GET_TRIP_ITINERARIES,
    GET_TRIP_ITINERARIES_FAILURE,
    GET_TRIP_ITINERARIES_SUCCESS,
    REMOVE_ITEM_FROM_ITINERARY_DAY,
    REMOVE_ITEM_FROM_ITINERARY_DAY_FAILURE,
    REMOVE_ITEM_FROM_ITINERARY_DAY_SUCCESS
} from "./actions";
import {UPDATE_PLACES_SUCCESS} from "../../Places/utils/actions";

function* getTripItineraries({tripId}) {
    try {
        let response = yield call(itineraryApi.getTripItineraries, tripId);
        let result = response.data.data.trip.locations;

        yield put({type: GET_TRIP_ITINERARIES_SUCCESS, tripItineraries: result});
    } catch (error) {
        yield put({type: GET_TRIP_ITINERARIES_FAILURE, error});
    }
}

function* getItineraryDay({itineraryId, date}) {
    try {
        let response = yield call(itineraryApi.getItineraryDayDetail, itineraryId, date);
        let result = response.data.data.locationDayItinerary;

        const places = result.places;
        const items = places.map(place => {return {place: place.id, date: date, itineraryId: result.itinerary.id}});

        if(places && places.length > 0) {
            yield put({type: UPDATE_PLACES_SUCCESS, places});
        }
        yield put({type: GET_ITINERARY_DAY_ITEMS_SUCCESS, items, itineraryId: result.itinerary.id, date: date});
    } catch (error) {
        yield put({type: GET_ITINERARY_DAY_ITEMS_FAILURE, error});
    }
}

function* addLocationToItinerary({tripId, location}) {
    try {
        let response = yield call(itineraryApi.addLocationToTrip, tripId, location);
        let result = response.data.data.result;

        yield put({type: ADD_LOCATION_TO_TRIP_SUCCESS, tripLocation: result});
    } catch (error) {
        yield put({type: ADD_LOCATION_TO_TRIP_FAILURE, error});
    }
}

function* addItemToItineraryDay({itineraryId, placeId, day, position}) {
    try {
        let response = yield call(itineraryApi.addPlaceToItineraryDay, itineraryId, placeId, day, position);
        let result = response.data.data.addTripLocationItem;

        yield put({type: ADD_ITEM_TO_ITINERARY_DAY_SUCCESS, item: {place: result.place.id, date: day, itineraryId: itineraryId}});
        yield put({type: UPDATE_PLACES_SUCCESS, places: [result.place]});
    } catch (error) {
        yield put({type: ADD_ITEM_TO_ITINERARY_DAY_FAILURE, error});
    }
}

function* removeItemFromItineraryDay({itineraryId, placeId, day}) {
    try {
        const response = yield call(itineraryApi.removeItemFromItineraryDay, itineraryId, placeId, day);

        if(response.data.data.removeTripLocationItem) {
            yield put({
                type: REMOVE_ITEM_FROM_ITINERARY_DAY_SUCCESS,
                item: {place: placeId, date: Moment(day).toISOString(), itineraryId: itineraryId}
            });
        }
    } catch (error) {
        yield put({type: REMOVE_ITEM_FROM_ITINERARY_DAY_FAILURE, error});
    }
}

export default function* itinerariesRootSaga() {
    yield takeEvery(REMOVE_ITEM_FROM_ITINERARY_DAY, removeItemFromItineraryDay);
    yield takeEvery(ADD_ITEM_TO_ITINERARY_DAY, addItemToItineraryDay);
    yield takeEvery(ADD_LOCATION_TO_TRIP, addLocationToItinerary);
    yield takeEvery(GET_ITINERARY_DAY_ITEMS, getItineraryDay);
    yield takeEvery(GET_TRIP_ITINERARIES, getTripItineraries);
}