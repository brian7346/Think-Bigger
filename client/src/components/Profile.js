import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import MuiLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';
import EditIcon from '@material-ui/icons/Edit';
import CircularProgress from '@material-ui/core/CircularProgress';

import { uploadImageAction, logoutUserAction } from 'actions/userActions';
import { EditDetiles, MyButton } from '.';

const styles = theme => ({
  paper: {
    padding: 20
  },
  profileCredentials: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 10,
    '&:last-child': {
      marginBottom: 0
    }
  },
  credentialName: {
    paddingLeft: 5
  },
  profile: {
    position: 'relative',
    '& .image-wrapper': {
      textAlign: 'center',
      position: 'relative',
      '& button': {
        position: 'absolute',
        top: '-2%',
        left: '78%'
      }
    },
    '& .profile-image': {
      width: 200,
      height: 200,
      objectFit: 'cover',
      maxWidth: '100%',
      borderRadius: '50%'
    },
    '& .profile-details': {
      textAlign: 'center',
      '& span, svg': {
        verticalAlign: 'middle'
      },
      '& a': {
        color: theme.palette.primary.main
      }
    },
    '& hr': {
      border: 'none',
      margin: '0 0 10px 0'
    },
    '& svg.button': {
      '&:hover': {
        cursor: 'pointer'
      }
    }
  },
  buttons: {
    textAlign: 'center',
    '& a': {
      margin: '20px 10px'
    }
  },
  progressSpinner: {
    position: 'absolute',
    top: '20%',
    left: '15%'
  }
});

function Profile(props) {
  const { classes } = props;

  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const { loading, authenticated } = user;

  const {
    handle,
    createdAt,
    imageUrl,
    bio,
    website,
    location
  } = user.credentials;

  const handleImageChange = event => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append('image', image, image.name);
    dispatch(uploadImageAction(formData));
  };

  const handleEditPicture = () => {
    const fileInput = document.getElementById('inputImage');
    fileInput.click();
  };

  const handleLogout = () => {
    dispatch(logoutUserAction());
  };

  let profileMarkup = !loading ? (
    authenticated ? (
      <Paper className={classes.paper}>
        <div className={classes.profile}>
          <div className="image-wrapper">
            <img src={imageUrl} alt="profile" className="profile-image" />
            <MyButton tip="Edit profile picture" onClick={handleEditPicture}>
              <EditIcon color="primary" />
            </MyButton>
            <input
              type="file"
              id="inputImage"
              hidden="hidden"
              onChange={handleImageChange}
            />

            <hr />
            <div className="profile-details">
              <MuiLink
                component={Link}
                to={`/users/${handle}`}
                color="primary"
                variant="h5"
              >
                {' '}
                @{handle}
              </MuiLink>
            </div>
            <hr />
            {bio && <Typography variant="body2">{bio}</Typography>}
            <hr />
            {location && (
              <div className={classes.profileCredentials}>
                <LocationOn color="primary" mt={1} />{' '}
                <span className={classes.credentialName}>{location}</span>
                <hr />
              </div>
            )}
            {website && (
              <div className={classes.profileCredentials}>
                <LinkIcon color="primary" ml={10} />{' '}
                <a
                  href={website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={classes.credentialName}
                >
                  {' '}
                  {website}
                </a>
                <hr />
              </div>
            )}
            <div className={classes.profileCredentials}>
              <CalendarToday color="primary" />{' '}
              <span className={classes.credentialName}>
                Joined {dayjs(createdAt).format('MMM YYYY')}
              </span>
            </div>
          </div>
          <MyButton tip="Logout" onClick={handleLogout}>
            <KeyboardReturn color="primary" />
          </MyButton>
          <EditDetiles />
        </div>
      </Paper>
    ) : (
      <Paper className={classes.paper}>
        <Typography variant="body2" align="center">
          No profile found, please login again
        </Typography>
        <div className={classes.buttons}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/login"
          >
            Login
          </Button>
          <Button
            variant="contained"
            color="secondary"
            component={Link}
            to="/register"
          >
            Sign up
          </Button>
        </div>
      </Paper>
    )
  ) : (
    <CircularProgress size={30} className={classes.progressSpinner} />
  );
  return profileMarkup;
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Profile);
