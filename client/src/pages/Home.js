import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';

import { Post, Profile, PostSceleton } from 'components/';
import { getPostsAction } from 'actions/dataActions';

const styles = {
  postMarkup: {
    position: 'relative'
  }
};

function Home(props) {
  const data = useSelector(state => state.data);
  const dispatch = useDispatch();
  const { posts, loading } = data;
  const { classes } = props;

  useEffect(() => {
    dispatch(getPostsAction());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let recentPostsMarkup = !loading ? (
    posts.map(post => {
      return <Post post={post} key={post.postId} />;
    })
  ) : (
    <PostSceleton />
  );
  return (
    <Grid container spacing={2}>
      <Grid item sm={4}>
        <Profile />
      </Grid>
      <Grid item sm={8} className={classes.postMarkup}>
        {recentPostsMarkup}
      </Grid>
    </Grid>
  );
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Home);
