import {
  SET_USER,
  SET_ERRORS,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  CLEAR_ERRORS,
  LOADING_UI,
  LOADING_USER,
  LIKE_POST,
  UNLIKE_POST
} from 'actions/types';

const initialState = {
  authenticated: false,
  credentials: {},
  likes: [],
  notifications: [],
  loading: false
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
    case SET_USER:
      return { authenticated: true, loading: false, ...action.payload };
    case LOADING_USER:
      return { ...state, loading: true };
    case LIKE_POST:
      return {
        ...state,
        likes: [
          ...state.likes,
          {
            userHandle: state.credentials.handle,
            postId: action.payload.postId
          }
        ]
      };
    case UNLIKE_POST:
      return {
        ...state,
        likes: state.likes.filter(like => like.postId !== action.payload.postId)
      };
    default:
      return state;
  }
}
