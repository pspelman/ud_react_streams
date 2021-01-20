import {GOOGLE_AUTH_SIGN_IN, GOOGLE_AUTH_SIGN_OUT} from "../actions/types";

const INITIAL_STATE = {
  isSignedIn: null,
  userId: null,
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GOOGLE_AUTH_SIGN_IN:
      console.log(`[authReducer.js] - ${action.type} -> auth: `, true, ' userId: ', action.payload)
      return {...state, isSignedIn: true, userId: action.payload}
    case GOOGLE_AUTH_SIGN_OUT:
      console.log(`[authReducer.js] - ${action.type} -> auth: `, false)
      return {...state, isSignedIn: false, userId: null}
    default:
      console.log(`[authReducer.js] - ${action.type} -> auth: `, state.isSignedIn)
      return state
  }
}