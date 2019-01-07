import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import createSagaMiddleware from "redux-saga";
import {routerMiddleware} from 'react-router-redux'
import {persistReducer, persistStore} from 'redux-persist'
import sessionStorage from 'redux-persist/lib/storage/session'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import authRootSaga from "./Auth/utils/sagas";
import {authReducer} from "./Auth/utils/reducers";
import {all} from "redux-saga/effects";
import {tripsReducer} from "./Trips/utils/reducers";
import tripsRootSaga from "./Trips/utils/sagas";
import itinerariesRootSaga from "./Itinerary/utils/sagas";
import createHistory from "history/createBrowserHistory";
import {itinerariesReducer} from "./Itinerary/utils/reducers";
import {placesReducer} from "./Places/utils/reducers";
import placesRootSaga from "./Places/utils/sagas";
import {UNSET_USER} from "./Auth/utils/actions";
import {errorReducer, loadingReducer} from "./App/utils/reducers";


function* rootSaga() {
    yield all([
        authRootSaga(),
        tripsRootSaga(),
        itinerariesRootSaga(),
        placesRootSaga()
    ])
}

const combinedReducers = combineReducers({
    auth: authReducer,
    trips: tripsReducer,
    itineraries: itinerariesReducer,
    places: placesReducer,
    errors: errorReducer,
    loading: loadingReducer
});

const rootReducer = (state, action) => {
    if (action.type === UNSET_USER) {
        state = {}
    }

    return combinedReducers(state, action)
};

const persistConfig = {
    key: 'root',
    storage: sessionStorage,
    stateReconciler: autoMergeLevel2
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = (browserHistory) => createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(sagaMiddleware, routerMiddleware(browserHistory))),
);

export const history = createHistory();
export const store = configureStore(history);
export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);