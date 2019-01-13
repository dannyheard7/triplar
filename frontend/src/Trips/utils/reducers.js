import {CREATE_TRIP_SUCCESS, DELETE_TRIP_SUCCESS, EDIT_TRIP_SUCCESS, GET_TRIPS_SUCCESS} from "./actions";


const initialState = {
    trips: []
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
        case GET_TRIPS_SUCCESS:
            return {...state, trips: action.trips};
        case EDIT_TRIP_SUCCESS:
            return {...state, trips: updateTripInTrips(state.trips, action.trip)};
        case CREATE_TRIP_SUCCESS:
            return {...state, trips: state.trips.concat([action.trip])};
        case DELETE_TRIP_SUCCESS:
            return {...state, trips: state.trips.filter(x => x.id !== action.tripId)};
        default:
            return state;
    }
}