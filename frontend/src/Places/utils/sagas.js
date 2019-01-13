import {call, put, select, takeEvery} from 'redux-saga/effects'
import {
    GET_PLACE_DETAILS_REQUEST,
    GET_PLACE_DETAILS_FAILURE,
    GET_PLACE_DETAILS_SUCCESS,
    GET_POPULAR_PLACES_REQUEST,
    GET_POPULAR_PLACES_FAILURE,
    GET_POPULAR_PLACES_SUCCESS,
    GET_TOP_LEVEL_CATEGORIES_REQUEST,
    GET_TOP_LEVEL_CATEGORIES_FAILURE,
    GET_TOP_LEVEL_CATEGORIES_SUCCESS,
    UPDATE_PLACES_SUCCESS,
} from "./actions";
import api from "./places.api";

const oneDayInMilliseconds = (60*60*24*1000);
export const getStatePopularPlaces = (state) => state.places.popularPlaces;
export const getStateTopLevelCategories = (state) => state.places.topLevelCategories;

function* getPopularPlaces({lat, lng, category}) {
    let popularPlaces = yield select(getStatePopularPlaces);

    if(popularPlaces.findIndex(x => x.lat === lat && x.lng === lng && x.category === category &&
        (Date.now() - x.lastFetched) < oneDayInMilliseconds) === -1) {
        try {
            let response = yield call(api.getPopularPlaces, lat, lng, category);
            let result = response.data.data.popularPlaces;

            if(result && result.length > 0) {
                yield put({type: UPDATE_PLACES_SUCCESS, places: result});
            }

            result = {places: result.map(x => x['id']), category: category, lat: lat, lng: lng, lastFetched: Date.now()};
            yield put({type: GET_POPULAR_PLACES_SUCCESS, popularPlaces: result});

        } catch (error) {
            yield put({type: GET_POPULAR_PLACES_FAILURE, error});
        }
    }
}

function* getPlaceDetails({placeId}) {
    try {
        let response = yield call(api.getPlaceDetails, placeId);
        let result = response.data.data.place;

        yield put({type: GET_PLACE_DETAILS_SUCCESS, place: result});
    } catch (error) {
        yield put({type: GET_PLACE_DETAILS_FAILURE, error});
    }
}


function* getTopLevelCategories() {
    let topLevelCategories = yield select(getStateTopLevelCategories);

    if(!topLevelCategories.lastFetched || (Date.now() - topLevelCategories.lastFetched) > oneDayInMilliseconds) {
        try {
            let response = yield call(api.getTopLevelCategories);
            let result = response.data.data.categories;

            result = {categories: result, lastFetched: Date.now()};

            yield put({type: GET_TOP_LEVEL_CATEGORIES_SUCCESS, topLevelCategories: result});
        } catch (error) {
            yield put({type: GET_TOP_LEVEL_CATEGORIES_FAILURE, error});
        }
    }
}

export default function* placesRootSaga() {
    yield takeEvery(GET_TOP_LEVEL_CATEGORIES_REQUEST, getTopLevelCategories);
    yield takeEvery(GET_POPULAR_PLACES_REQUEST, getPopularPlaces);
    yield takeEvery(GET_PLACE_DETAILS_REQUEST, getPlaceDetails);
}