import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DeleteOutline from '@material-ui/icons/DeleteOutline';

import { deletePostAction } from 'actions/dataActions';
import { MyButton } from '.';

const styles = {
  deleteButton: {
    position: 'absolute',
    left: '90%'
  }
};

function DeleteScream(props) {
  const { classes, postId } = props;
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const deletePost = () => {
    dispatch(deletePostAction(postId));
    handleClose();
  };

  return (
    <>
      <MyButton
        tip="Delete Scream"
        onClick={handleOpen}
        btnClassName={classes.deleteButton}
      >
        <DeleteOutline color="error" />
      </MyButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Are you sure you whant yo delete this post?</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={deletePost} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

DeleteScream.propTypes = {
  classes: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired
};

export default withStyles(styles)(DeleteScream);
