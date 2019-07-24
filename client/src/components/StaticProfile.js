import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

import withStyles from '@material-ui/core/styles/withStyles';
import MuiLink from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';

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
      position: 'relative'
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
    }
  }
});

function StaticProfile(props) {
  const {
    classes,
    profile: { handle, createdAt, imageUrl, bio, website, location }
  } = props;
  return (
    <Paper className={classes.paper}>
      <div className={classes.profile}>
        <div className="image-wrapper">
          <img src={imageUrl} alt="profile" className="profile-image" />

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
      </div>
    </Paper>
  );
}

StaticProfile.propTypes = {
  classes: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

export default withStyles(styles)(StaticProfile);
