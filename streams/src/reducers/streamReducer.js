import {
  CREATE_STREAM,
  FETCH_STREAM,
  FETCH_STREAMS,
  EDIT_STREAM,
  DELETE_STREAM,
  GOOGLE_AUTH_SIGN_IN,
  GOOGLE_AUTH_SIGN_OUT
} from "../actions/types";

const omit = (key, {[key]: _, ...obj}) => obj

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_STREAMS:
      let streamsUpdate = {
        ...state,
        ...action.payload.reduce((updatedStreams, currentItem) => {
          return {...updatedStreams, [currentItem.id]: currentItem}
        }, {})
      };
      console.log(`UPDATED STREAMS: `, streamsUpdate)
      return streamsUpdate
    case FETCH_STREAM:
      console.log(`FETCHED STREAM: `, action.payload.id, " --> ", action.payload)

      return {...state, [action.payload.id]: action.payload}
    case CREATE_STREAM:
      return {...state, [action.payload.id]: action.payload}
    case EDIT_STREAM:
      return {...state, [action.payload.id]: action.payload}
    case DELETE_STREAM:
      return {...omit(action.payload, state)} // the delete stream action sends the id as the payload
    default:
      return state
  }
}
