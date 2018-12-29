import {all, call, cancel, cancelled, fork, put, take} from 'redux-saga/effects'
import {
    LOGIN_ERROR,
    LOGIN_REQUESTING,
    LOGIN_SUCCESS,
    setUser,
    VERIFY_TOKEN,
    VERIFY_TOKEN_ERROR,
    VERIFY_TOKEN_SUCCESS,
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

        yield setCookie('userToken', result.jwt);
        yield put(setUser(result));
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

function* verifyToken(token) {
    try {
        let response = yield call(api.verifyToken, token);
        let result = response.data.data.result;

        yield setCookie('userToken', result.jwt);
        yield put(setUser({email: result.email}));
        yield put({type: VERIFY_TOKEN_SUCCESS});
    } catch (error) {
        yield put({type: VERIFY_TOKEN_ERROR, error})
    }
}

function* verifyTokenWatcher() {
    while(true) {
        const {token} = yield take(VERIFY_TOKEN);
        yield call(verifyToken, token);
    }
}


export default function* authRootSaga() {
    yield all([
        loginWatcher(),
        verifyTokenWatcher()
    ])
}