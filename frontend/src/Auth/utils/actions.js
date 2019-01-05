export const LOGIN_REQUESTING = 'LOGIN_REQUESTING';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';

export const FACEBOOK_LOGIN_REQUESTING = 'FACEBOOK_LOGIN_REQUESTING';

export const VERIFY_TOKEN = 'VERIFY_TOKEN';
export const VERIFY_TOKEN_SUCCESS = 'VERIFY_TOKEN_SUCCESS';
export const VERIFY_TOKEN_ERROR = 'VERIFY_TOKEN_ERROR';

export const SET_USER = 'SET_USER';
export const UNSET_USER = 'UNSET_USER';

export function loginRequest (loginDetails) {
  return {
    type: LOGIN_REQUESTING,
    loginDetails
  }
}

export function facebookLoginRequest (token) {
    return {
        type: FACEBOOK_LOGIN_REQUESTING,
        token
    }
}

export function verifyToken(jwt) {return {type: VERIFY_TOKEN, jwt: jwt}}

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