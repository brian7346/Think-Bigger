import {
  SET_POSTS,
  LOADING_DATA,
  LOADING_UI,
  LIKE_POST,
  UNLIKE_POST,
  DELETE_POST,
  CREATE_POST,
  SET_ERRORS,
  CLEAR_ERRORS,
  SET_POST,
  STOP_LOADING_UI
} from './types';
import axios from 'axios';

// @action  GET /posts
// @desc   Get posts / Получить все посты
export const getPostsAction = () => async dispatch => {
  dispatch({ type: LOADING_DATA });
  try {
    const res = await axios.get('/posts');
    dispatch({
      type: SET_POSTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: SET_POSTS,
      payload: []
    });
  }
};

// @action  GET /post
// @desc   Get post / Получить пост
export const getPostAction = postId => async dispatch => {
  dispatch({ type: LOADING_UI });
  try {
    const res = await axios.get(`/post/${postId}`);
    dispatch({
      type: SET_POST,
      payload: res.data
    });
    dispatch({
      type: STOP_LOADING_UI
    });
  } catch (err) {
    console.log(err);
  }
};

// @action  POST /posts
// @desc   Get posts / Получить все посты
export const createPostAction = newPost => async dispatch => {
  dispatch({ type: LOADING_UI });
  const res = await axios.post('/post', newPost);
  dispatch({
    type: CREATE_POST,
    payload: res.data
  });
  dispatch({
    type: CLEAR_ERRORS,
    payload: []
  });
};

// @action GET /post/{postId}/like
// @desc   like post / Поставить лайк на пост
export const likePostAction = postId => async dispatch => {
  try {
    const res = await axios.get(`/post/${postId}/like`);
    dispatch({
      type: LIKE_POST,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
  }
};

// @action  GET /post/{postId}/unlike
// @desc   unlike post / Убрать лайк с поста
export const unlikePostAction = postId => async dispatch => {
  try {
    const res = await axios.get(`/post/${postId}/unlike`);
    dispatch({
      type: UNLIKE_POST,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
  }
};

// @action  DELETE /posts/{postId}
// @desc   delete post / Удалить пост
export const deletePostAction = postId => async dispatch => {
  try {
    await axios.delete(`/post/${postId}`);
    dispatch({
      type: DELETE_POST,
      payload: postId
    });
  } catch (err) {
    console.log(err);
  }
};

export const setErrorsAction = error => ({
  type: SET_ERRORS,
  payload: error
});

export const clearErrorsAction = error => ({
  type: CLEAR_ERRORS,
  payload: []
});
