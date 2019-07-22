import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';

import { createPostAction, setErrorsAction } from 'actions/dataActions';
import { MyButton } from '.';

const style = {
  textField: {
    margin: '10px auto 10px auto'
  },
  button: {
    margin: '20px 0 20px 0',
    position: 'relative'
  },
  progressSpinner: {
    position: 'absolute'
  },
  closeButton: {
    position: 'absolute',
    left: '90%',
    top: '5%'
  }
};

function CreatePost(props) {
  const UI = useSelector(state => state.UI);
  const dispatch = useDispatch();
  const { loading, errors } = UI;
  const { classes } = props;

  const [open, setOpen] = useState(false);
  const [body, setBody] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleBody = event => setBody(event.target.value);
  const handleSubmit = async event => {
    event.preventDefault();

    const newPost = {
      body
    };
    try {
      await dispatch(createPostAction(newPost));
      handleClose();
    } catch (err) {
      dispatch(setErrorsAction(err.response.data));
    }
  };

  return (
    <>
      <MyButton tip="Create post" onClick={handleOpen}>
        <AddIcon color="primary" />
      </MyButton>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <MyButton
          tip="Close"
          onClick={handleClose}
          tipClassName={classes.closeButton}
        >
          <CloseIcon />
        </MyButton>
        <DialogTitle>Create a new post</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              name="body"
              type="text"
              label="What do you think?"
              multiline
              rows="3"
              placeholder="Type something"
              error={errors.body ? true : false}
              helperText={errors.body}
              className={classes.textField}
              onChange={handleBody}
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
              disabled={loading}
            >
              submit
              {loading && (
                <CircularProgress
                  size={30}
                  className={classes.progressSpinner}
                />
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

CreatePost.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(style)(CreatePost);
