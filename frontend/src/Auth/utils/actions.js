export const LOGIN_REQUESTING = 'LOGIN_REQUESTING';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';

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

export function verifyToken(token) {return {type: VERIFY_TOKEN, token}}

export function setUser (user) {
  return {
      type: SET_USER,
      user
  }
}

export function unsetUser() {
  return {
    type: UNSET_USER,
  }
}