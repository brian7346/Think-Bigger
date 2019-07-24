import {
  SET_USER,
  SET_ERRORS,
  LOADING_UI,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  MARK_NOTIFICATIONS_READ
} from './types';
import axios from 'axios';

// @action  POST /register
// @desc   Login / Вход
export const loginUserAction = (userData, history) => async dispatch => {
  dispatch({ type: LOADING_UI });
  try {
    const res = await axios.post('/login', userData);

    setAuthorizationHeader(res.data.token);
    dispatch(getUserData());

    history.push('/');
  } catch (err) {
    dispatch({
      type: SET_ERRORS,
      payload: err.response.data
    });
  }
};

// @action  POST /register
// @desc   Register user / Регистрация
export const registerUserAction = (newUserData, history) => async dispatch => {
  dispatch({ type: LOADING_UI });
  try {
    const res = await axios.post('/register', newUserData);

    setAuthorizationHeader(res.data.token);
    dispatch(getUserData());
    history.push('/');
  } catch (err) {
    dispatch({
      type: SET_ERRORS,
      payload: err.response.data
    });
  }
};

export const logoutUserAction = () => dispatch => {
  localStorage.removeItem('FBIdToken');
  delete axios.defaults.headers.common['Authorization'];
  dispatch({ type: SET_UNAUTHENTICATED });
};

// @action  GET /user
// @desc   Get user data / Получить инфорацию о пользователе
export const getUserData = () => async dispatch => {
  dispatch({ type: LOADING_USER });
  try {
    const res = await axios.get('/user');

    dispatch({
      type: SET_USER,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
  }
};

// @action  POST /user/image
// @desc   Upload profile image / Загрузить картинку профиля
export const uploadImageAction = formData => async dispatch => {
  dispatch({ type: LOADING_USER });
  try {
    await axios.post('/user/image', formData);
    dispatch(getUserData());
  } catch (err) {
    console.log(err);
  }
};

// @action  POST /user/image
// @desc   Update details/ Обновить информацию
export const editUserDetailsAction = userDetails => async dispatch => {
  dispatch({ type: LOADING_USER });
  try {
    await axios.post('/user', userDetails);
    dispatch(getUserData());
  } catch (err) {
    console.log(err);
  }
};

// @action  POST /notifications
// @desc   Mark notifications / Помечаем оповещения
export const markNotificationsReadAction = notificationsIds => async dispatch => {
  try {
    await axios.post('/notifications/', notificationsIds);
    dispatch({
      type: MARK_NOTIFICATIONS_READ
    });
  } catch (err) {
    console.log(err);
  }
};

const setAuthorizationHeader = token => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem('FBIdToken', FBIdToken);
  axios.defaults.headers.common['Authorization'] = FBIdToken;
};
