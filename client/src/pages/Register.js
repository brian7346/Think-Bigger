import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import { Link, withRouter } from "react-router-dom";
import { registerUserAction } from "actions/userActions";
import { CLEAR_ERRORS } from "actions/types";

const styles = theme => ({
  form: {
    textAlign: "center"
  },
  pageTitle: {
    margin: "10px auto 10px auto"
  },
  textField: {
    margin: "10px auto 10px auto"
  },
  button: {
    marginTop: 20,
    position: "relative"
  },
  customError: {
    color: "red",
    fontSize: "0.8rem",
    marginTop: 10
  },
  progress: {
    position: "absolute"
  }
});

function Register(props) {
  const { classes } = props;

  const UI = useSelector(state => state.UI);
  const { loading } = UI;
  const { errors } = UI;
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [handle, setHandle] = useState("");

  const handleEmail = event => setEmail(event.target.value);
  const handlePassword = event => setPassword(event.target.value);
  const handleConfirmPassword = event => setConfirmPassword(event.target.value);
  const handleHandle = event => setHandle(event.target.value);

  const handleSubmit = event => {
    event.preventDefault();

    const newUserData = {
      email,
      password,
      confirmPassword,
      handle
    };

    dispatch(registerUserAction(newUserData, props.history));
  };

  useEffect(() => {
    return () => {
      dispatch({ type: CLEAR_ERRORS });
    };
  }, []);

  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm>
        <Typography variant="h2" className={classes.pageTitle}>
          Register
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
          <TextField
            fullWidth
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            label="Confirm Password"
            className={classes.textField}
            value={confirmPassword}
            onChange={handleConfirmPassword}
            helperText={errors.confirmPassword}
            error={errors.confirmPassword ? true : false}
          />
          <TextField
            fullWidth
            id="handle"
            name="handle"
            type="text"
            label="Handle"
            className={classes.textField}
            value={handle}
            onChange={handleHandle}
            helperText={errors.handle}
            error={errors.handle ? true : false}
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
            Sign up
            {loading && (
              <CircularProgress size={30} className={classes.progress} />
            )}
          </Button>
          <br />
          <small>
            Already have an account? Log in{" "}
            <Link to="/login">
              <strong>here</strong>
            </Link>{" "}
          </small>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  );
}

Register.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(Register));
