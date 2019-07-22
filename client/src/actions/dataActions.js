import { SET_POSTS, LOADING_DATA, LIKE_POST, UNLIKE_POST } from './types';
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

// @action  GET /posts
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
