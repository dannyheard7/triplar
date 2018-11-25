import {
    ADD_ITEM_TO_ITINERARY_DAY, ADD_ITEM_TO_ITINERARY_DAY_FAILURE, ADD_ITEM_TO_ITINERARY_DAY_SUCCESS,
    ADD_LOCATION_TO_TRIP,
    ADD_LOCATION_TO_TRIP_FAILURE,
    ADD_LOCATION_TO_TRIP_SUCCESS,
    GET_ITINERARY_DAY_ITEMS, GET_ITINERARY_DAY_ITEMS_FAILURE, GET_ITINERARY_DAY_ITEMS_SUCCESS,
    GET_TRIP_ITINERARIES,
    GET_TRIP_ITINERARIES_FAILURE,
    GET_TRIP_ITINERARIES_SUCCESS
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

function updateItineraryItemInItineraryItems(itineraryItems, itineraryItem) {
    let foundIndex = itineraryItems.findIndex(x => x.itineraryId === itineraryItem.itineraryId && x.date === itineraryItem.date);

    if (foundIndex !== -1) {
        itineraryItems[foundIndex] = itineraryItem;
    } else {
        itineraryItems.push(itineraryItem);
    }

    return itineraryItems;
}

function removeItineraryItemsForDay(itineraryItems, itineraryId, day) {
    return itineraryItems.filter(x => x.itineraryId !== itineraryId && x.date !== day);
}

export function itinerariesReducer(state = initialState, action) {
    switch (action.type) {
        case GET_TRIP_ITINERARIES:
        case ADD_LOCATION_TO_TRIP:
        case GET_ITINERARY_DAY_ITEMS:
        case ADD_ITEM_TO_ITINERARY_DAY:
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
            return {...state, itineraryItems: [...state.itineraryItems, action.item], errors: []};
        case GET_TRIP_ITINERARIES_FAILURE:
        case ADD_LOCATION_TO_TRIP_FAILURE:
        case GET_ITINERARY_DAY_ITEMS_FAILURE:
        case ADD_ITEM_TO_ITINERARY_DAY_FAILURE:
            return {...state, errors: action.errors};
        default:
            return state;
    }
}