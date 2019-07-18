import {
  SET_USER_ASYNC,
  SET_ERRORS,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  CLEAR_ERRORS,
  LOADING_UI
} from "actions/types";

const initialState = {
  authenticated: false,
  credentials: {},
  likes: [],
  notifications: []
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true
      };
    case SET_UNAUTHENTICATED:
      return {
        ...state,
        authenticated: false
      };
    case SET_USER_ASYNC:
      return { authenticated: true, ...action.payload };
    default:
      return state;
  }
}
