import streamsApi from "../apis/streamsApi";

// export const signIn = (credentials) => dispatch => {
//   console.log(`trying to login with google`, )
//   dispatch({type: 'GOOGLE_AUTH_LOGIN_INIT'})
// }

import {
  CREATE_STREAM,
  FETCH_STREAM,
  FETCH_STREAMS,
  EDIT_STREAM,
  DELETE_STREAM,
  GOOGLE_AUTH_SIGN_IN,
  GOOGLE_AUTH_SIGN_OUT
} from "./types";
import history from "../history";

export const signOut = () => {
  console.log(`[actions/index.js] - returning signOut action`, )
  return {
    type: GOOGLE_AUTH_SIGN_OUT,
  }
}

export const signIn = (userId) => {
  console.log(`[actions/index.js] - returning signIn() action`, )
  return {
    type: GOOGLE_AUTH_SIGN_IN,
    payload: userId
  }
}
// listen to auth changes

export const createStream = (formValues) =>  async (dispatch, getState) => {
  console.log(`[actions/index.js] - createStream() -> trying to create stream with values: `, formValues)
  const {userId} = getState().auth
  const response = await streamsApi.post('/streams', {...formValues, userId})
  dispatch({type: CREATE_STREAM, payload: response.data})
  // Note: want to navigate AFTER successful creation of new stream
  history.push('/')
}

export const fetchStreams = () => async dispatch => {
  const response = await streamsApi.get('/streams')
  dispatch({type: FETCH_STREAMS, payload: response.data})
}

export const fetchStream = (id) => async dispatch => {
  const response = await streamsApi.get(`/streams/${id}`)
  dispatch({type: FETCH_STREAM, payload: response.data})
}

export const editStream = (id, formValues) => async dispatch => {
  // const response = await streamsApi.put(`/streams/${id}`, formValues)
  const response = await streamsApi.patch(`/streams/${id}`, formValues)
  dispatch({type: EDIT_STREAM, payload: response.data})
  history.push('/')
}

export const deleteStream = (id) => async dispatch => {
  await streamsApi.delete(`/streams/${id}`)
  dispatch({type: DELETE_STREAM, payload: id})
}