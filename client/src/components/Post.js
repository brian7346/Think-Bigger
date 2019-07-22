import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';

import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import ChatIcon from '@material-ui/icons/Chat';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Favorite from '@material-ui/icons/Favorite';

import { likePostAction, unlikePostAction } from 'actions/dataActions';
import { MyButton } from '.';

const styles = {
  card: {
    display: 'flex',
    marginBottom: 20
  },
  image: {
    minWidth: 200
  },
  content: {
    padding: 25,
    objectFit: 'cover'
  },
  likeCommentsPanel: {
    display: 'flex',
    alignItems: 'center'
  }
};

function Post(props) {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const { authenticated } = user;
  const {
    classes,
    post: {
      body,
      createdAt,
      userImage,
      userHandle,
      postId,
      likeCount,
      commentCount
    }
  } = props;

  dayjs.extend(relativeTime);

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
    <MyButton tip="Like">
      <Link to="/login">
        <FavoriteBorder color="primary" />
      </Link>
    </MyButton>
  ) : likedPost() ? (
    <MyButton tip="Undo like" onClick={unlikePost}>
      <Favorite color="primary" />
    </MyButton>
  ) : (
    <MyButton tip="Like" onClick={likePost}>
      <FavoriteBorder color="primary" />
    </MyButton>
  );

  return (
    <Card className={classes.card}>
      <CardMedia
        image={userImage}
        title="Profile image"
        className={classes.image}
      />
      <CardContent className={classes.content}>
        <Typography
          variant="h5"
          component={Link}
          to={`/users/${userHandle}`}
          color="primary"
        >
          {userHandle}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {dayjs(createdAt).fromNow()}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          {body}
        </Typography>
        <div className={classes.likeCommentsPanel}>
          {likeButton}
          <span>{likeCount} likes</span>
          <MyButton tip="comments">
            <ChatIcon color="primary" />
          </MyButton>
          <span>{commentCount} comments</span>
        </div>
      </CardContent>
    </Card>
  );
}

Post.propTypes = {
  classes: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired
};

export default withStyles(styles)(Post);
