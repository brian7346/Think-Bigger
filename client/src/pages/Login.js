import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';

import { loginUserAction } from 'actions/userActions';
import { CLEAR_ERRORS } from 'actions/types';

const styles = theme => ({
  form: {
    textAlign: 'center'
  },
  pageTitle: {
    margin: '10px auto 10px auto'
  },
  textField: {
    margin: '10px auto 10px auto'
  },
  button: {
    marginTop: 20,
    position: 'relative'
  },
  customError: {
    color: 'red',
    fontSize: '0.8rem',
    marginTop: 10
  },
  progress: {
    position: 'absolute'
  }
});

function Login(props) {
  const { classes } = props;

  const UI = useSelector(state => state.UI);
  const { loading } = UI;
  const { errors } = UI;
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmail = event => setEmail(event.target.value);
  const handlePassword = event => setPassword(event.target.value);

  const handleSubmit = event => {
    event.preventDefault();

    const userData = {
      email,
      password
    };

    dispatch(loginUserAction(userData, props.history));
  };

  useEffect(() => {
    return () => {
      dispatch({ type: CLEAR_ERRORS });
    };
  }, [dispatch]);
  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm>
        <Typography variant="h2" className={classes.pageTitle}>
          Login
        </Typography>
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            fullWidth
            id="email"
            name="email"
            type="email"
            label="Email"
            className={classes.textField}
            value={email}
            onChange={handleEmail}
            helperText={errors.email}
            error={errors.email ? true : false}
          />
          <TextField
            fullWidth
            id="password"
            name="password"
            type="password"
            label="Password"
            className={classes.textField}
            value={password}
            onChange={handlePassword}
            helperText={errors.password}
            error={errors.password ? true : false}
          />
          {errors.general && (
            <Typography variant="body2" className={classes.customError}>
              {errors.general}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
            disabled={loading}
          >
            Login
            {loading && (
              <CircularProgress size={30} className={classes.progress} />
            )}
          </Button>
          <br />
          <small>
            Dont have an account? Sign up{' '}
            <Link to="/register">
              <strong>here</strong>
            </Link>{' '}
          </small>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  );
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(Login));
