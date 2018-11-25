import {all, call, cancel, cancelled, fork, put, take} from 'redux-saga/effects'
import {
    LOGIN_ERROR,
    LOGIN_REQUESTING,
    LOGIN_SUCCESS,
    setUser,
    TOKEN_REFRESH,
    TOKEN_REFRESH_ERROR,
    TOKEN_REFRESH_SUCCESS,
    UNSET_USER,
    unsetUser
} from './actions'
import api from "Auth/utils/auth.api.js";
import {push} from "react-router-redux";
import {deleteCookie, setCookie} from "../../App/utils/utils";


function* logout() {
    yield put(unsetUser());
    yield deleteCookie('userToken');
    yield put(push('/login'));
}

function* loginFlow(loginDetails) {
    let result;

    try {
        let response = yield call(api.getLoginToken, loginDetails);
        result = response.data.data.result;

        yield setCookie('userToken', result.token);
        yield put(setUser(result.user));
        yield put({type: LOGIN_SUCCESS});

        yield put(push('/trips'))
    } catch (error) {
        yield put({type: LOGIN_ERROR, error})
    } finally {
        if (yield cancelled()) {
            yield put(push('/login'))
        }
    }

    return result;
}

function* loginWatcher() {
    while (true) {
        const {loginDetails} = yield take(LOGIN_REQUESTING);

        const task = yield fork(loginFlow, loginDetails);

        const action = yield take([UNSET_USER, LOGIN_ERROR]);
        if (action.type === UNSET_USER) yield cancel(task);
        yield deleteCookie('userToken');

        yield call(logout)
    }
}

function* refreshToken(token) {
    try {
        let response = yield call(api.refreshToken, token);
        let result = response.data.data.result;

        yield setCookie('userToken', result.token);
        yield put(setUser({email: result.payload.email}));
        yield put({type: TOKEN_REFRESH_SUCCESS});
    } catch (error) {
        yield put({type: TOKEN_REFRESH_ERROR, error})
    }
}

function* refreshTokenWatcher() {
    while(true) {
        const {token} = yield take(TOKEN_REFRESH);
        yield call(refreshToken, token);
    }
}


export default function* authRootSaga() {
    yield all([
        loginWatcher(),
        refreshTokenWatcher()
    ])
}