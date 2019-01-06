import {call, put, takeEvery} from 'redux-saga/effects'
import {push} from "react-router-redux";
import Moment from "moment";

import itineraryApi from "./itinerary.api";
import {
    ADD_ITEM_TO_ITINERARY_DAY,
    ADD_ITEM_TO_ITINERARY_DAY_FAILURE,
    ADD_ITEM_TO_ITINERARY_DAY_SUCCESS,
    ADD_TRIP_LOCATION,
    ADD_TRIP_LOCATION_FAILURE,
    ADD_TRIP_LOCATION_SUCCESS,
    DELETE_TRIP_LOCATION,
    DELETE_TRIP_LOCATION_FAILURE,
    DELETE_TRIP_LOCATION_SUCCESS,
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

function* addTripLocationFlow({tripId, location}) {
    try {
        let response = yield call(itineraryApi.addLocationToTrip, tripId, location);
        let result = response.data.data.result;

        yield put({type: ADD_TRIP_LOCATION_SUCCESS, tripLocation: result});
    } catch (error) {
        yield put({type: ADD_TRIP_LOCATION_FAILURE, error});
    }
}

function* deleteTripLocationFlow({locationId, tripId}) {
    try {
        let response = yield call(itineraryApi.deleteTripLocation, locationId);
        let result = response.data.data.deleteTripLocation;

        if(result) {
            yield put({type: DELETE_TRIP_LOCATION_SUCCESS, locationId});
            yield put(push(`/trips/${tripId}`));
        } else {
            yield put({type: DELETE_TRIP_LOCATION_FAILURE, result});
        }
    } catch (error) {
        yield put({type: DELETE_TRIP_LOCATION_FAILURE, error});
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
    yield takeEvery(ADD_TRIP_LOCATION, addTripLocationFlow);
    yield takeEvery(DELETE_TRIP_LOCATION, deleteTripLocationFlow);
    yield takeEvery(GET_ITINERARY_DAY_ITEMS, getItineraryDay);
    yield takeEvery(GET_TRIP_ITINERARIES, getTripItineraries);
}