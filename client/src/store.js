import { createStore, applyMiddleware, compose } from "redux";
import reducer from "reducers/";
import thunk from "redux-thunk";

const initialState = {};
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
export default store;
