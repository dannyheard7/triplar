import {all, call, put, take} from 'redux-saga/effects'
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

function* getTripItineraries(tripId) {
    try {
        let response = yield call(itineraryApi.getTripItineraries, tripId);
        let result = response.data.data.trip.locations;

        yield put({type: GET_TRIP_ITINERARIES_SUCCESS, tripItineraries: result});
    } catch (error) {
        yield put({type: GET_TRIP_ITINERARIES_FAILURE, error});
    }
}

function* getTripItinerariesWatcher() {
    while(true) {
        const {tripId} = yield take(GET_TRIP_ITINERARIES);
        yield call(getTripItineraries, tripId);
    }
}

function* getItineraryDay(itineraryId, date) {
    try {
        let response = yield call(itineraryApi.getItineraryDayDetail, itineraryId, date);
        let result = response.data.data.locationDayItinerary;

        let places = result.map(item => { return item.place });
        yield put({type: UPDATE_PLACES_SUCCESS, places: places});

        result = result.map(item => { return {place: item.place.id, date: date, itineraryId: item.itinerary.id }});

        yield put({type: GET_ITINERARY_DAY_ITEMS_SUCCESS, items: result, itineraryId: itineraryId, date: date});
    } catch (error) {
        yield put({type: GET_ITINERARY_DAY_ITEMS_FAILURE, error});
    }
}

function* getItineraryDayWatcher() {
    while(true) {
        const {itineraryId, date} = yield take(GET_ITINERARY_DAY_ITEMS);
        yield call(getItineraryDay, itineraryId, date);
    }
}

function* addLocationToItinerary(tripId, location) {
    try {
        let response = yield call(itineraryApi.addLocationToTrip, tripId, location);
        let result = response.data.data.result.tripLocation;

        yield put({type: ADD_LOCATION_TO_TRIP_SUCCESS, tripLocation: result});
    } catch (error) {
        yield put({type: ADD_LOCATION_TO_TRIP_FAILURE, error});
    }
}

function* addLocationToTripWatcher() {
    while(true) {
        const {tripId, location} = yield take(ADD_LOCATION_TO_TRIP);
        yield call(addLocationToItinerary, tripId, location);
    }
}

function* addItemToItineraryDay(itineraryId, placeId, day, position) {
    try {
        let response = yield call(itineraryApi.addPlaceToItineraryDay, itineraryId, placeId, day, position);
        let result = response.data.data.addTripLocationItem.tripLocationItem;

        yield put({type: UPDATE_PLACES_SUCCESS, places: [result.place]});
        yield put({type: ADD_ITEM_TO_ITINERARY_DAY_SUCCESS, item: {place: result.place.id, date: day, itineraryId: itineraryId}});
    } catch (error) {
        yield put({type: ADD_ITEM_TO_ITINERARY_DAY_FAILURE, error});
    }
}

function* addItemToItineraryDayWatcher() {
    while(true) {
        const {itineraryId, placeId, day, position} = yield take(ADD_ITEM_TO_ITINERARY_DAY);
        yield call(addItemToItineraryDay, itineraryId, placeId, day, position);
    }
}

function* removeItemFromItineraryDay(itineraryId, placeId, day) {
    try {
        const response = yield call(itineraryApi.removeItemFromItineraryDay, itineraryId, placeId, day);

        if(response.data.data.removeTripLocationItem.result) {
            yield put({
                type: REMOVE_ITEM_FROM_ITINERARY_DAY_SUCCESS,
                item: {place: placeId, date: day, itineraryId: itineraryId}
            });
        }
    } catch (error) {
        yield put({type: REMOVE_ITEM_FROM_ITINERARY_DAY_FAILURE, error});
    }
}

function* removeItemFromItineraryDayWatcher() {
    while(true) {
        const {itineraryId, placeId, day} = yield take(REMOVE_ITEM_FROM_ITINERARY_DAY);
        yield call(removeItemFromItineraryDay, itineraryId, placeId, day);
    }
}


export default function* itinerariesRootSaga() {
    yield all([
        getTripItinerariesWatcher(),
        getItineraryDayWatcher(),
        addLocationToTripWatcher(),
        addItemToItineraryDayWatcher(),
        removeItemFromItineraryDayWatcher()
    ])
}