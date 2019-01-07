import {
    LOGIN_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    SET_USER,
    VERIFY_TOKEN_REQUEST, VERIFY_TOKEN_FAILURE,
    VERIFY_TOKEN_SUCCESS,
    UNSET_USER
} from "./actions";


const initialState = {
    requesting: false,
    successful: false,
    user: {},
    jwt: null
};

export function authReducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN_REQUEST:
        case VERIFY_TOKEN_REQUEST:
            return {...state, requesting: true, successful: false};
        case LOGIN_SUCCESS:
        case VERIFY_TOKEN_SUCCESS:
            return {...state, requesting: false, successful: true};
        case LOGIN_FAILURE:
        case VERIFY_TOKEN_FAILURE:
            return {
                ...state,
                requesting: false,
                successful: false
            };
        case SET_USER:
            return {...state, jwt: action.jwt, user: action.user};
        case UNSET_USER:
            return {...state, user: {}, successful: false, requesting: false};
        default:
            return state;
    }
}