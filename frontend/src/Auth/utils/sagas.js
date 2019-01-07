import {all, call, cancel, cancelled, fork, put, take, takeEvery} from 'redux-saga/effects'
import {
    FACEBOOK_LOGIN_REQUEST,
    LOGIN_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    REGISTER_FAILURE,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    setUser,
    UNSET_USER,
    VERIFY_TOKEN_FAILURE,
    VERIFY_TOKEN_REQUEST,
    VERIFY_TOKEN_SUCCESS
} from './actions'
import api from "./auth.api.js";
import {push} from "react-router-redux";
import {deleteCookie, setCookie} from "../../App/utils/utils";


function* logout() {
    yield deleteCookie('userToken');
    yield put(push('/login'));
}

function* loginFlow(loginDetails) {
    let result;

    try {
        let response = yield call(api.passwordAuth, loginDetails);
        result = response.data;

        yield setCookie('userToken', result.jwt);
        yield put(setUser(result));
        yield put({type: LOGIN_SUCCESS});

        yield put(push('/trips'))
    } catch (error) {
        if(error.response) yield put({type: LOGIN_FAILURE, error: error.response.data.error});
        else yield put({type: LOGIN_FAILURE, error: new Error("Could not connect to the server")})
    } finally {
        if (yield cancelled()) {
            yield put(push('/login'))
        }
    }

    return result;
}

function* loginWatcher() {
    while (true) {
        const {loginDetails} = yield take(LOGIN_REQUEST);

        const task = yield fork(loginFlow, loginDetails);

        const action = yield take([UNSET_USER, LOGIN_FAILURE]);
        if (action.type === UNSET_USER) yield cancel(task);

        yield call(logout)
    }
}

function* facebookLoginFlow(token) {
    let result;

    try {
        let response = yield call(api.facebookAuth, token);
        result = response.data;

        yield setCookie('userToken', result.jwt);
        yield put(setUser(result));
        yield put({type: LOGIN_SUCCESS});

        yield put(push('/trips'))
    } catch (error) {
        if(error.response) yield put({type: LOGIN_FAILURE, error: error.response.data});
        else yield put({type: LOGIN_FAILURE, error: new Error("Could not connect to the server")})
    } finally {
        if (yield cancelled()) {
            yield put(push('/login'))
        }
    }

    return result;
}

function* facebookLoginWatcher() {
    while (true) {
        const {token} = yield take(FACEBOOK_LOGIN_REQUEST);
        const task = yield fork(facebookLoginFlow, token);

        const action = yield take([UNSET_USER, LOGIN_FAILURE]);
        if (action.type === UNSET_USER) yield cancel(task);

        yield call(logout)
    }
}

function* verifyToken({jwt}) {
    try {
        let response = yield call(api.verifyToken, jwt);
        let result = response.data.data.userInfo;

        yield setCookie('userToken', result.jwt);
        yield put(setUser(result));
        yield put({type: VERIFY_TOKEN_SUCCESS});
    } catch (error) {
        if(error.response) yield put({type: VERIFY_TOKEN_FAILURE, error: error.response.data});
        else yield put({type: VERIFY_TOKEN_FAILURE, error: new Error("Could not connect to the server")})
    }
}

function* registerUserFlow({userDetails}) {
    try {
        let response = yield call(api.registerUser, userDetails);
        const data = response.data;

        if(data.data) {
            yield put({type: REGISTER_SUCCESS});
            yield put(push('/login/'))
        } else {
            let errors = data.errors;
            console.log(errors);
            yield put({type: REGISTER_FAILURE, error: errors});
        }
    } catch (error) {
        console.log(error);
        yield put({type: REGISTER_FAILURE, error});
    }
}


export default function* authRootSaga() {
    yield takeEvery(UNSET_USER, logout);
    yield takeEvery(VERIFY_TOKEN_REQUEST, verifyToken);
    yield takeEvery(REGISTER_REQUEST, registerUserFlow);
    yield all([
        loginWatcher(),
        facebookLoginWatcher()
    ]);
}