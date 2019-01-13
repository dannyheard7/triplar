import {
    ADD_ITEM_TO_ITINERARY_DAY_SUCCESS,
    ADD_TRIP_LOCATION_SUCCESS,
    DELETE_TRIP_LOCATION_SUCCESS,
    GET_ITINERARY_DAY_ITEMS_SUCCESS,
    GET_TRIP_ITINERARIES_SUCCESS,
    REMOVE_ITEM_FROM_ITINERARY_DAY_SUCCESS
} from "./actions";


const initialState = {
    locationItineraries: [],
    itineraryItems: []
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
        case GET_TRIP_ITINERARIES_SUCCESS:
            return {...state, locationItineraries: action.tripItineraries};
        case ADD_TRIP_LOCATION_SUCCESS:
            return {...state, locationItineraries: updateItineraryInItineraries(state.locationItineraries, action.tripLocation)};
        case DELETE_TRIP_LOCATION_SUCCESS:
            return {...state, locationItineraries: state.locationItineraries.filter(x => x.id !== action.locationId),
                itineraryItems: state.itineraryItems.filter(x => x.itineraryId !== action.locationId)};
        case GET_ITINERARY_DAY_ITEMS_SUCCESS:
            return {...state, itineraryItems: [...removeItineraryItemsForDay(state.itineraryItems, action.itineraryId, action.date), ...action.items]};
        case ADD_ITEM_TO_ITINERARY_DAY_SUCCESS:
            return {...state, itineraryItems: [...state.itineraryItems, action.item]};
        case REMOVE_ITEM_FROM_ITINERARY_DAY_SUCCESS:
            return {...state, itineraryItems: removeItemFromItineraryItems(state.itineraryItems, action.item)};
        default:
            return state;
    }
}