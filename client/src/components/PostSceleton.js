import React from 'react';
import NoImg from 'images/no-image.png';
import PropTypes from 'prop-types';

import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';

const styles = theme => ({
  card: {
    display: 'flex',
    marginBottom: 20
  },
  cardContent: {
    width: '100%',
    flexDirecton: 'column',
    padding: 25
  },
  cover: {
    minWidth: 200,
    objectFit: 'cover'
  },
  handle: {
    width: 60,
    height: 18,
    backgroundColor: theme.palette.primary.main,
    marginBottom: 20
  },
  date: {
    height: 14,
    width: 100,
    backgroundColor: 'rgba(0, 0,0, 0.3)',
    marginBottom: 10
  },
  fullLine: {
    height: 15,
    width: '90%',
    backgroundColor: 'rgba(0, 0,0, 0.6)',
    marginBottom: 10
  },
  halfLine: {
    height: 15,
    width: '40%',
    backgroundColor: 'rgba(0, 0,0, 0.6)',
    marginBottom: 10
  }
});

function PostSceleton(props) {
  const { classes } = props;
  const content = Array.from({ length: 3 }).map((item, index) => (
    <Card className={classes.card} key={index}>
      <CardMedia className={classes.cover} image={NoImg} />
      <CardContent className={classes.cardContent}>
        <div className={classes.handle} />
        <div className={classes.date} />
        <div className={classes.fullLine} />
        <div className={classes.fullLine} />
        <div className={classes.halfLine} />
      </CardContent>
    </Card>
  ));
  return <>{content}</>;
}

PostSceleton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PostSceleton);
