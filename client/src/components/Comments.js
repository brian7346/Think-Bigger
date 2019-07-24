import React, { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

const style = {
  invisibleSeparator: {
    border: 'none',
    margin: 4
  },
  visibleSeparator: {
    marginBottom: 20
  },
  commentImage: {
    width: 100,
    height: 100,
    objectFit: 'cover',
    borderRadius: '50%'
  },
  paper: {
    padding: 20
  },
  commentContent: {
    justifyContent: 'space-between'
  }
};

function Comments(props) {
  const { comments, classes } = props;
  return (
    <Grid container>
      {comments.map((comment, index) => {
        const { body, createdAt, userImage, userHandle } = comment;
        return (
          <Fragment key={createdAt}>
            <Grid item sm={12}>
              <Paper className={classes.paper}>
                <Grid container className={classes.commentContent}>
                  <Grid item sm={2}>
                    <img
                      src={userImage}
                      alt=""
                      className={classes.commentImage}
                    />
                  </Grid>
                  <Grid item sm={9}>
                    <Typography
                      variant="h5"
                      component={Link}
                      to={`/users/${userHandle}`}
                      color="primary"
                    >
                      {userHandle}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                    </Typography>
                    <hr className={classes.invisibleSeparator} />
                    <Typography variant="body1">{body}</Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            {index !== comments.length - 1 && (
              <hr className={classes.visibleSeparator} />
            )}
          </Fragment>
        );
      })}
    </Grid>
  );
}
Comments.defaultProps = {
  comments: []
};

Comments.propTypes = {
  classes: PropTypes.object.isRequired,
  comments: PropTypes.array
};

export default withStyles(style)(Comments);
