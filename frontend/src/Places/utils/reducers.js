import {
    GET_PLACE_DETAILS_SUCCESS,
    GET_POPULAR_PLACES_SUCCESS,
    GET_TOP_LEVEL_CATEGORIES_SUCCESS,
    UPDATE_PLACES_SUCCESS
} from "./actions";


const initialState = {
    popularPlaces: [],
    places: [],
    topLevelCategories: {}
};


function removePopularPlacesOfCategoryAtLocation(popularPlaces, category, lat, lng) {
    return popularPlaces.filter(x => !(x.category === category && x.lat === lat && x.lng === lng));
}

// Something wrong with this function
function updatePlaces(places, placesToUpdate) {
    places = places.map(place => {
        let findIndex = placesToUpdate.findIndex(updatedPlace => updatedPlace.id === place.id);

        if(findIndex === -1) {
            return place;
        } else {
            const updatedPlace = placesToUpdate.splice(findIndex, 1)[0];
            return {...place, ...updatedPlace};
        }
    });

    return places.concat(placesToUpdate);
}


export function placesReducer(state = initialState, action) {
    switch (action.type) {
        case GET_POPULAR_PLACES_SUCCESS:
            return {...state, popularPlaces: removePopularPlacesOfCategoryAtLocation(state.popularPlaces,
                    action.popularPlaces.category, action.popularPlaces.lat, action.popularPlaces.lng).concat([action.popularPlaces])};
        case UPDATE_PLACES_SUCCESS:
            return {...state, places: updatePlaces(state.places, action.places)};
        case GET_PLACE_DETAILS_SUCCESS:
            return {...state, places: updatePlaces(state.places, [action.place])};
        case GET_TOP_LEVEL_CATEGORIES_SUCCESS:
            return {...state, topLevelCategories: action.topLevelCategories};
        default:
            return state;
    }
}