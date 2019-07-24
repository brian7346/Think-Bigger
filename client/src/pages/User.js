import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';

import { getUserDataAction } from 'actions/dataActions';
import {
  Post,
  StaticProfile,
  PostSceleton,
  ProfileSceleton
} from 'components/';

const styles = {
  profile: {
    position: 'relative'
  },
  postMarkup: {
    position: 'relative'
  },
  spinner: {
    position: 'absolute'
  },
  spinnerPosts: {
    position: 'absolute',
    left: '22%'
  },
  spinnerProfile: {
    position: 'absolute',
    top: '30%',
    left: '43%'
  }
};

function User(props) {
  const data = useSelector(state => state.data);
  const dispatch = useDispatch();
  const { loading, posts } = data;
  const { classes } = props;

  const [profile, setProfile] = useState(null);
  const [postIdParam, setPostIdParam] = useState(null);

  const handleProfile = data => setProfile(data);
  const handlePostIdParam = data => setPostIdParam(data);

  useEffect(() => {
    const handle = props.match.params.handle;
    const postId = props.match.params.postId;

    if (postId) {
      handlePostIdParam(postId);
    }

    dispatch(getUserDataAction(handle));

    try {
      axios.get(`/user/${handle}`).then(res => {
        handleProfile(res.data.user);
      });
    } catch (err) {
      console.log(err);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const postsMarkup = loading ? (
    <PostSceleton />
  ) : !posts ? (
    <p>No posts from this user</p>
  ) : !postIdParam ? (
    posts.map(post => <Post key={post.postId} post={post} />)
  ) : (
    posts.map(post => {
      if (post.postId !== postIdParam) {
        return <Post key={post.postId} post={post} />;
      } else {
        return <Post key={post.postId} post={post} openDialog />;
      }
    })
  );

  return (
    <Grid container spacing={2}>
      <Grid item sm={4} className={classes.profile}>
        {!profile ? <ProfileSceleton /> : <StaticProfile profile={profile} />}
      </Grid>
      <Grid item sm={8} className={classes.postMarkup}>
        {postsMarkup}
      </Grid>
    </Grid>
  );
}

User.propTypes = {};

export default withStyles(styles)(User);
