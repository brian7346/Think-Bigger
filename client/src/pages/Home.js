import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Grid from '@material-ui/core/Grid';

import { Post, Profile } from 'components/';
import { getPostsAction } from 'actions/dataActions';

export default function Home() {
  const data = useSelector(state => state.data);
  const dispatch = useDispatch();
  const { posts, loading } = data;

  useEffect(() => {
    dispatch(getPostsAction());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let recentPostsMarkup = !loading ? (
    posts.map(post => {
      return <Post post={post} key={post.postId} />;
    })
  ) : (
    <p>Loading</p>
  );
  return (
    <Grid container spacing={2}>
      <Grid item sm={4}>
        <Profile />
      </Grid>
      <Grid item sm={8}>
        {recentPostsMarkup}
      </Grid>
    </Grid>
  );
}
