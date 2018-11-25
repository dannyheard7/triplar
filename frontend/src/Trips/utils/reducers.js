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
} from "./actions";


const initialState = {
    trips: [],
    errors: []
};

function updateTripInTrips(trips, updatedTrip) {
    let foundIndex = trips.findIndex(x => x.id === updatedTrip.id);

    if (foundIndex !== -1) {
        trips[foundIndex] = updatedTrip;
    } else {
        trips.push(updatedTrip);
    }

    return trips;
}

export function tripsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_TRIPS:
        case CREATE_TRIP:
        case EDIT_TRIP:
        case DELETE_TRIP:
            return {...state, errors: []};
        case GET_TRIPS_SUCCESS:
            return {...state, trips: action.trips, errors: []};
        case EDIT_TRIP_SUCCESS:
            return {...state, trips: updateTripInTrips(state.trips, action.trip), errors: []};
        case CREATE_TRIP_SUCCESS:
            return {...state, trips: state.trips.concat([action.trip]), errors: []};
        case DELETE_TRIP_SUCCESS:
            return {...state, trips: state.trips.filter(x => x.id !== action.tripId), errors: []};
        case GET_TRIPS_FAILURE:
        case CREATE_TRIP_FAILURE:
        case EDIT_TRIP_FAILURE:
        case DELETE_TRIP_FAILURE:
            return {...state, errors: action.errors};
        default:
            return state;
    }
}