import { createStore, applyMiddleware, compose } from 'redux';
import reducer from 'reducers/';
import thunk from 'redux-thunk';

const initialState = {};
const middleware = [thunk];

// include Redux dev tools
// Подключаем Redux dev tools
const devTools =
  process.env.NODE_ENV === 'development'
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
    : null;

const store = createStore(
  reducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    devTools
  )
);
export default store;
