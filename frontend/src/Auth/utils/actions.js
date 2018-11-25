import {GET_TOP_LEVEL_CATEGORIES} from "../../Places/utils/actions";

export const LOGIN_REQUESTING = 'LOGIN_REQUESTING';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';

export const TOKEN_REFRESH = 'TOKEN_REFRESH';
export const TOKEN_REFRESH_SUCCESS = 'TOKEN_REFRESH_SUCCESS';
export const TOKEN_REFRESH_ERROR = 'TOKEN_REFRESH_ERROR';

export const SET_USER = 'SET_USER';
export const UNSET_USER = 'UNSET_USER';

export function loginRequest (loginDetails) {
  return {
    type: LOGIN_REQUESTING,
    loginDetails
  }
}

export function tokenRefresh(token) {return {type: TOKEN_REFRESH, token}}

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