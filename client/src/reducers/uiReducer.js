import {
  LOADING_UI,
  SET_ERRORS,
  CLEAR_ERRORS,
  STOP_LOADING_UI
} from 'actions/types';

const initialState = {
  loading: false,
  errors: {}
};

export default function uiReducer(state = initialState, action) {
  switch (action.type) {
    case LOADING_UI:
      return {
        ...state,
        loading: true
      };
    case SET_ERRORS:
      return {
        ...state,
        loading: false,
        errors: action.payload
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        errors: {}
      };
    case STOP_LOADING_UI:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
}
