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
import EditIcon from '@material-ui/icons/Edit';

import { editUserDetailsAction } from 'actions/userActions';
import { MyButton } from '.';

const styles = theme => ({
  textField: {
    margin: '10px auto 10px auto'
  },
  button: {
    position: 'absolute',
    top: '89%',
    left: '78%'
  }
});

function EditDetiles(props) {
  const { classes } = props;
  const credentials = useSelector(state => state.user.credentials);
  const dispatch = useDispatch();

  const [bio, setBio] = useState('');
  const [website, setWebsite] = useState('');
  const [location, setLocation] = useState('');
  const [open, setOpen] = useState(false);

  const handleBio = event => setBio(event.target.value);
  const handleWebsite = event => setWebsite(event.target.value);
  const handleLocation = event => setLocation(event.target.value);

  const handleOpen = () => {
    setOpen(true);
    mapUserDetailsToState(credentials);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    mapUserDetailsToState(credentials);
  }, [credentials]);

  const mapUserDetailsToState = credentials => {
    credentials.bio ? setBio(credentials.bio) : setBio('');
    credentials.website ? setWebsite(credentials.website) : setWebsite('');
    credentials.location ? setLocation(credentials.location) : setLocation('');
  };

  const handleSubmit = () => {
    const userDetails = {
      bio,
      website,
      location
    };

    dispatch(editUserDetailsAction(userDetails));
    handleClose();
  };

  return (
    <>
      <MyButton
        tip="Edit details"
        onClick={handleOpen}
        btnClassName={classes.button}
      >
        <EditIcon color="primary" />
      </MyButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Edit your details</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              name="bio"
              type="text"
              label="Bio"
              multiline
              rows={3}
              placeholder="A short bio about yourself"
              className={classes.textField}
              value={bio}
              onChange={handleBio}
              fullWidth
            />
            <TextField
              name="website"
              type="text"
              label="Website"
              placeholder="Your personal website"
              className={classes.textField}
              value={website}
              onChange={handleWebsite}
              fullWidth
            />
            <TextField
              name="location"
              type="text"
              label="Location"
              placeholder="Where you live"
              className={classes.textField}
              value={location}
              onChange={handleLocation}
              fullWidth
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            {' '}
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            {' '}
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

EditDetiles.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EditDetiles);
