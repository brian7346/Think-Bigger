import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Grid from "@material-ui/core/Grid";

import { Post, Profile } from "components/";

export default function Home() {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const [posts, setPost] = useState(null);

  const handlePosts = data => setPost(data);

  useEffect(() => {
    axios
      .get("/posts")
      .then(res => {
        handlePosts(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  let recentPostsMarkup = posts ? (
    posts.map(post => <Post post={post} key={post.postId} />)
  ) : (
    <p>Loading</p>
  );
  return (
    <Grid container spacing={2}>
      <Grid item sm={4} xs={12}>
        <Profile />
      </Grid>
      <Grid item sm={8} xs={12}>
        {recentPostsMarkup}
      </Grid>
    </Grid>
  );
}
