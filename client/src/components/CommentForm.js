import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import {
  submitCommentAction,
  setErrorsAction,
  clearErrorsAction
} from 'actions/dataActions';

const style = {
  formItem: {
    textAlign: 'center'
  },
  textField: {
    margin: '10px auto 10px auto'
  },
  button: {
    marginTop: 20,
    position: 'relative',
    float: 'right'
  },
  visibleSeparator: {
    width: '100%',
    borderBottom: '1px solid rgba(0 ,0, 0, 0.1)',
    marginBottom: 20
  }
};

function CommentForm(props) {
  const UI = useSelector(state => state.UI);
  const { errors } = UI;
  const authenticated = useSelector(state => state.user.authenticated);
  const dispatch = useDispatch();

  const { classes, postId } = props;

  const [body, setBody] = useState('');
  const heandleBody = event => setBody(event.target.value);
  const handleSubmit = async event => {
    event.preventDefault();

    const newComment = {
      body
    };

    try {
      await dispatch(submitCommentAction(postId, newComment));
      setBody('');
    } catch (err) {
      dispatch(setErrorsAction(err.response.data));
    }
  };

  useEffect(() => {
    return () => {
      dispatch(clearErrorsAction());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const commentFormMarkup = authenticated ? (
    <Grid item sm={12} className={classes.formItem}>
      <form onSubmit={handleSubmit}>
        <TextField
          name="body"
          type="text"
          label="Comment on post"
          error={errors.comment ? true : false}
          helperText={errors.comment}
          value={body}
          onChange={heandleBody}
          fullWidth
          className={classes.textField}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Submit
        </Button>
        {/* <hr className={classes.visibleSeparator} /> */}
      </form>
    </Grid>
  ) : null;

  return commentFormMarkup;
}

CommentForm.propTypes = {
  classes: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired
};

export default withStyles(style)(CommentForm);
