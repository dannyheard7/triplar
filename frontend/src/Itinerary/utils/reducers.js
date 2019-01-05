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


const initialState = {
    locationItineraries: [],
    itineraryItems: [],
    errors: []
};

function updateItineraryInItineraries(itineraries, updatedItinerary) {
    let foundIndex = itineraries.findIndex(x => x.id === updatedItinerary.id);

    if (foundIndex !== -1) {
        itineraries[foundIndex] = updatedItinerary;
    } else {
        itineraries.push(updatedItinerary);
    }

    return itineraries;
}

function removeItineraryItemsForDay(itineraryItems, itineraryId, day) {
    return itineraryItems.filter(x => !(x.itineraryId === itineraryId && x.date === day));
}

function removeItemFromItineraryItems(itineraryItems, item) {
    return itineraryItems.filter(x => !(x.itinerary === item.itinerary && x.place === item.place && x.date === item.date));
}

export function itinerariesReducer(state = initialState, action) {
    switch (action.type) {
        case GET_TRIP_ITINERARIES:
        case ADD_LOCATION_TO_TRIP:
        case GET_ITINERARY_DAY_ITEMS:
        case ADD_ITEM_TO_ITINERARY_DAY:
        case REMOVE_ITEM_FROM_ITINERARY_DAY:
            return {...state, errors: []};
        case GET_TRIP_ITINERARIES_SUCCESS:
            return {...state, locationItineraries: action.tripItineraries, errors: []};
        case ADD_LOCATION_TO_TRIP_SUCCESS:
            return {...state, locationItineraries: updateItineraryInItineraries(state.locationItineraries, action.tripLocation),
                errors: []};
        case GET_ITINERARY_DAY_ITEMS_SUCCESS:
            return {...state, itineraryItems: [...removeItineraryItemsForDay(state.itineraryItems, action.itineraryId, action.date), ...action.items],
                errors: []};
        case ADD_ITEM_TO_ITINERARY_DAY_SUCCESS:
            console.log(action.item);
            return {...state, itineraryItems: [...state.itineraryItems, action.item]};
        case REMOVE_ITEM_FROM_ITINERARY_DAY_SUCCESS:
            return {...state, itineraryItems: removeItemFromItineraryItems(state.itineraryItems, action.item)};
        case GET_TRIP_ITINERARIES_FAILURE:
        case ADD_LOCATION_TO_TRIP_FAILURE:
        case GET_ITINERARY_DAY_ITEMS_FAILURE:
        case ADD_ITEM_TO_ITINERARY_DAY_FAILURE:
        case REMOVE_ITEM_FROM_ITINERARY_DAY_FAILURE:
            return {...state, errors: action.errors};
        default:
            return state;
    }
}