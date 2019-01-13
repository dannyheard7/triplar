export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const FACEBOOK_LOGIN_REQUEST = 'FACEBOOK_LOGIN_REQUEST';

export const VERIFY_TOKEN_REQUEST = 'VERIFY_TOKEN_REQUEST';
export const VERIFY_TOKEN_SUCCESS = 'VERIFY_TOKEN_SUCCESS';
export const VERIFY_TOKEN_FAILURE = 'VERIFY_TOKEN_FAILURE';

export const SET_USER = 'SET_USER';
export const UNSET_USER = 'UNSET_USER';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

export function loginRequest (loginDetails) {
  return {
    type: LOGIN_REQUEST,
    loginDetails
  }
}

export function facebookLoginRequest (token) {
    return {
        type: FACEBOOK_LOGIN_REQUEST,
        token
    }
}

export function verifyToken(jwt) {return {type: VERIFY_TOKEN_REQUEST, jwt: jwt}}

export function setUser (user, jwt) {
  return {
      type: SET_USER,
      user,
      jwt
  }
}

export function unsetUser() {
  return {
    type: UNSET_USER,
  }
}

export function registerRequest (userDetails) {
    return {
        type: REGISTER_REQUEST,
        userDetails
    }
}