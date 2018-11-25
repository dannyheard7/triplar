import {
    LOGIN_ERROR,
    LOGIN_REQUESTING,
    LOGIN_SUCCESS,
    SET_USER,
    TOKEN_REFRESH, TOKEN_REFRESH_ERROR,
    TOKEN_REFRESH_SUCCESS,
    UNSET_USER
} from "./actions";


const initialState = {
    requesting: false,
    successful: false,
    errors: [],
    user: {},
    token: null
};

export function authReducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN_REQUESTING:
        case TOKEN_REFRESH:
            return {...state, requesting: true, successful: false, errors: []};
        case LOGIN_SUCCESS:
        case TOKEN_REFRESH_SUCCESS:
            return {...state, requesting: false, successful: true};
        case LOGIN_ERROR:
        case TOKEN_REFRESH_ERROR:
            return {
                ...state,
                requesting: false,
                successful: false,
                errors: state.errors.concat([{body: action.error.toString()}])
            };
        case SET_USER:
            return {...state, token: action.token, user: action.user};
        case UNSET_USER:
            return {...state, user: {}, successful: false, requesting: false};
        default:
            return state;
    }
}