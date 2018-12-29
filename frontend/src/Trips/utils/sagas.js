import {all, call, put, take, takeEvery} from 'redux-saga/effects'
import {
    CREATE_TRIP,
    CREATE_TRIP_FAILURE,
    CREATE_TRIP_SUCCESS, DELETE_TRIP, DELETE_TRIP_FAILURE, DELETE_TRIP_SUCCESS,
    EDIT_TRIP,
    EDIT_TRIP_FAILURE,
    EDIT_TRIP_SUCCESS,
    GET_TRIPS,
    GET_TRIPS_FAILURE,
    GET_TRIPS_SUCCESS
} from './actions'
import api from "./trips.api";
import {push} from "react-router-redux";


function* getTripsFlow() {
    try {
        let response = yield call(api.getTrips);
        let result = response.data.data.trips;

        yield put({type: GET_TRIPS_SUCCESS, trips: result});
    } catch (error) {
        yield put({type: GET_TRIPS_FAILURE, error});
    }
}

function* createTripFlow(trip) {
    try {
        let response = yield call(api.createTrip, trip);
        let result = response.data.data.result;

        yield put({type: CREATE_TRIP_SUCCESS, trip: result});
        yield put(push('/trips/' + result.id))
    } catch (error) {
        yield put({type: CREATE_TRIP_FAILURE, error});
    }
}

function* createTripWatcher() {
    while(true) {
        const {trip} = yield take(CREATE_TRIP);
        yield call(createTripFlow, trip);
    }
}

function* editTripFlow(tripId, trip) {
    try {
        let response = yield call(api.editTrip, tripId, trip);
        let result = response.data.data.result;

        yield put({type: EDIT_TRIP_SUCCESS, trip: result});
    } catch (error) {
        yield put({type: EDIT_TRIP_FAILURE, error});
    }
}

function* editTripWatcher() {
    while(true) {
        const {tripId, trip} = yield take(EDIT_TRIP);
        yield call(editTripFlow, tripId, trip);
    }
}

function* deleteTripFlow(tripId) {
    try {
        let response = yield call(api.deleteTrip, tripId);
        let result = response.data.data.deleteTrip;

        if(result === true) {
            yield put({type: DELETE_TRIP_SUCCESS, tripId: tripId});
            yield put(push('/trips'));
        } else {
            yield put({type: DELETE_TRIP_FAILURE, result});
        }
    } catch (error) {
        yield put({type: DELETE_TRIP_FAILURE, error});
    }
}

function* deleteTripWatcher() {
    while(true) {
        const {tripId} = yield take(DELETE_TRIP);
        yield call(deleteTripFlow, tripId);
    }
}


export default function* tripsRootSaga() {
    yield takeEvery(GET_TRIPS, getTripsFlow);
    yield all([
        createTripWatcher(),
        editTripWatcher(),
        deleteTripWatcher(),
    ])
}