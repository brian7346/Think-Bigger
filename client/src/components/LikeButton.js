import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

import { likePostAction, unlikePostAction } from 'actions/dataActions';
import { MyButton } from '.';

function LikeButton(props) {
  const user = useSelector(state => state.user);
  const { authenticated } = user;
  const dispatch = useDispatch();

  const { postId } = props;

  const likedPost = () => {
    if (user.likes && user.likes.find(like => like.postId === postId)) {
      return true;
    } else {
      return false;
    }
  };

  const likePost = () => {
    dispatch(likePostAction(postId));
  };

  const unlikePost = () => {
    dispatch(unlikePostAction(postId));
  };

  const likeButton = !authenticated ? (
    <Link to="/login">
      <MyButton tip="Like">
        <FavoriteBorder color="primary" />
      </MyButton>
    </Link>
  ) : likedPost() ? (
    <MyButton tip="Undo like" onClick={unlikePost}>
      <Favorite color="primary" />
    </MyButton>
  ) : (
    <MyButton tip="Like" onClick={likePost}>
      <FavoriteBorder color="primary" />
    </MyButton>
  );
  return likeButton;
}

LikeButton.propTypes = {
  postId: PropTypes.string.isRequired
};

export default LikeButton;
