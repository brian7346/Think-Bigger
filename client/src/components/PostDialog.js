import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';

import withStyles from '@material-ui/styles/withStyles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import UnfoldMore from '@material-ui/icons/UnfoldMore';
import ChatIcon from '@material-ui/icons/Chat';

import { getPostAction } from 'actions/dataActions';
import { MyButton, LikeButton, Comments, CommentForm } from '.';

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
    width: '100%',
    height: 200,
    borderRadius: '50%',
    objectFit: 'cover'
  },
  dialogContent: {
    padding: 20
  },
  closeButton: {
    position: 'absolute',
    left: '90%'
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

  const { postId, classes, userHandle, openDialog } = props;
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
  const [oldUrl, setOldUrl] = useState('');

  useEffect(() => {
    if (openDialog) {
      handleOpen();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOpen = () => {
    let oldPath = window.location.pathname;
    const newPath = `/users/${userHandle}/post/${postId}`;

    if (oldPath === newPath) {
      oldPath = `/users/${userHandle}`;
    }

    window.history.pushState(null, null, newPath);
    setOpen(true);
    setOldUrl(oldPath);
    dispatch(getPostAction(postId));
  };
  const handleClose = () => {
    window.history.pushState(null, null, oldUrl);
    setOpen(false);
  };
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
      <CommentForm postId={postId} />
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
  userHandle: PropTypes.string.isRequired,
  openDialog: PropTypes.bool
};

export default withStyles(style)(PostDialog);
