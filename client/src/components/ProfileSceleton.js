import React from 'react';
import NoImg from 'images/no-image.png';
import PropTypes from 'prop-types';

import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';

const styles = theme => ({
  paper: {
    padding: 20
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
  handle: {
    height: 20,
    backgroundColor: theme.palette.primary.main,
    width: 60,
    margin: '0 auto 7px auto'
  },
  fullLine: {
    height: 15,
    backgroundColor: 'rgba(0,0,0, 0.6)',
    width: '100%',
    marginBottom: 10
  },
  halfLine: {
    height: 15,
    backgroundColor: 'rgba(0,0,0, 0.6)',
    width: '100%',
    marginBottom: 10
  }
});

function ProfileSceleton(props) {
  const { classes } = props;
  return (
    <Paper className={classes.paper}>
      <div className={classes.profile}>
        <div className="image-wrapper">
          <img src={NoImg} alt="prifile" className="profile-image" />
          <hr />
          <div className="profile-details">
            <div className={classes.handle} />
            <div className={classes.fullLine} />
            <div className={classes.fullLine} />
            <hr />
            <LocationOn color="primary" /> <span>Location</span>
            <hr />
            <LinkIcon color="primary" /> https://brianfrancy.com
            <hr />
            <CalendarToday color="primary" /> Joined date
          </div>
        </div>
      </div>
    </Paper>
  );
}

ProfileSceleton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProfileSceleton);
