import {combineReducers} from "redux";
import {LOGGED_IN, LOGGED_OUT} from "./actions";

// The starting state sets authentication  based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.
function auth(state = {
    isAuthenticated: localStorage.getItem('token') != null,
    user: JSON.parse(localStorage.getItem('user')),
    token: localStorage.getItem('token')
}, action) {
    switch (action.type) {
        case LOGGED_IN:
            return Object.assign({}, state, {
                isAuthenticated: true,
                user: action.user,
                token: action.token
            });
        case LOGGED_OUT:
            return Object.assign({}, state, {
                isAuthenticated: false,
            });
        default:
            return state
    }
}

const rootReducer = combineReducers({
    auth
});

export default rootReducer