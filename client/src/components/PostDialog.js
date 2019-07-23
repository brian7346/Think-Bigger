import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';

import withStyles from '@material-ui/styles/withStyles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import UnfoldMore from '@material-ui/icons/UnfoldMore';
import ChatIcon from '@material-ui/icons/Chat';

import { getPostAction } from 'actions/dataActions';
import { MyButton, LikeButton, Comments } from '.';

const style = {
  invisibleSeparator: {
    border: 'none',
    margin: 4
  },
  visibleSeparator: {
    width: '100%',
    borderBottom: '1px solid rgba(0 ,0, 0, 0.1)',
    marginBottom: 20
  },
  profileImage: {
    maxWidth: 200,
    height: 200,
    borderRadius: '50%',
    objectFit: 'cover'
  },
  dialogContent: {
    padding: 20
  },
  closeButton: {
    position: 'absolute',
    left: '90%',
    top: '8%'
  },
  expandButton: {
    position: 'absolute',
    left: '90%'
  },
  spinnerDiv: {
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 50
  },
  dialogUserInfo: {
    display: 'flex'
  }
};

function PostDialog(props) {
  const UI = useSelector(state => state.UI);
  const post = useSelector(state => state.data.post);
  const dispatch = useDispatch();

  const { postId, classes, userHandle } = props;
  const {
    body,
    createdAt,
    likeCount,
    commentCount,
    userImage,
    comments
  } = post;
  const { loading } = UI;

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    dispatch(getPostAction(postId));
  };
  const handleClose = () => setOpen(false);

  const dialogMarkup = loading ? (
    <div className={classes.spinnerDiv}>
      <CircularProgress size={100} thickness={2} />
    </div>
  ) : (
    <Grid container spacing={3}>
      <Grid item sm={5}>
        <img src={userImage} alt="Profile" className={classes.profileImage} />
      </Grid>
      <Grid item sm={7}>
        <Typography
          component={Link}
          color="primary"
          variant="h5"
          to={`/users/${userHandle}`}
        >
          @{userHandle}
        </Typography>
        <hr className={classes.invisibleSeparator} />
        <Typography color="textSecondary" variant="body2">
          {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
        </Typography>
        <hr className={classes.invisibleSeparator} />
        <Typography variant="body1">{body}</Typography>
        <LikeButton postId={postId} />
        <span>{likeCount} likes</span>
        <MyButton tip="Comments">
          <ChatIcon color="primary" />
        </MyButton>
        <span>{commentCount} comments</span>
      </Grid>
      <hr className={classes.visibleSeparator} />
      <Comments comments={comments} />
    </Grid>
  );

  return (
    <>
      <MyButton
        tip="Expand post"
        onClick={handleOpen}
        tipClassName={classes.expandButton}
      >
        <UnfoldMore color="primary" />
      </MyButton>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <MyButton
          tip="Close"
          onClick={handleClose}
          tipClassName={classes.closeButton}
        >
          <CloseIcon />
        </MyButton>
        <DialogContent>
          <DialogContent className={classes.dialogContent}>
            {dialogMarkup}
          </DialogContent>
        </DialogContent>
      </Dialog>
    </>
  );
}

PostDialog.propTypes = {
  postId: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired
};

export default withStyles(style)(PostDialog);
