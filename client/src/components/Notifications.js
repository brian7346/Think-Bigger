import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import FavoriveIcon from '@material-ui/icons/Favorite';
import ChatIcon from '@material-ui/icons/Chat';

import { markNotificationsReadAction } from 'actions/userActions';

function Notifications() {
  const notifications = useSelector(state => state.user.notifications);
  const dispatch = useDispatch();
  dayjs.extend(relativeTime);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = event => setAnchorEl(event.target);
  const handleClose = () => setAnchorEl(null);
  const onMenuOpened = () => {
    let unreadNotificationsIds = notifications
      .filter(not => !not.read)
      .map(not => not.notificationId);

    dispatch(markNotificationsReadAction(unreadNotificationsIds));
  };

  let notificationIcon;

  // Check for array with notifications
  // And showing number of it
  // Проверяем массив с оповещениями
  // И показываем их число
  if (notifications && notifications.length > 0) {
    notifications.filter(not => not.read === false).length
      ? (notificationIcon = (
          <Badge
            badgeContent={
              notifications.filter(not => not.read === false).length
            }
            color="secondary"
          >
            <NotificationsIcon />
          </Badge>
        ))
      : (notificationIcon = <NotificationsIcon />);
  } else {
    notificationIcon = <NotificationsIcon />;
  }

  let notifocationsMarkup =
    notifications && notifications.length > 0 ? (
      notifications.map(not => {
        const verb = not.type === 'like' ? 'liked' : 'commented on';
        const time = dayjs(not.createdAt).fromNow();
        const iconColor = not.read ? 'primary' : 'secondary';
        const icon =
          not.type === 'like' ? (
            <FavoriveIcon color={iconColor} style={{ marginRight: 10 }} />
          ) : (
            <ChatIcon olor={iconColor} style={{ marginRight: 10 }} />
          );

        return (
          <MenuItem key={not.createdAt} onClick={handleClose}>
            <Typography
              component={Link}
              color="default"
              variant="body1"
              to={`/users/${not.recipient}/post/${not.postId}`}
            >
              {icon}
              {not.sender} {verb} your posts {time}
            </Typography>
          </MenuItem>
        );
      })
    ) : (
      <MenuItem onClick={handleClose}>You have no notifications yet</MenuItem>
    );
  return (
    <>
      <Tooltip title="Notifications">
        <IconButton
          aria-owns={anchorEl ? 'simple-menu' : undefined}
          aria-haspopup="true"
          onClick={handleOpen}
        >
          {notificationIcon}
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        onEntered={onMenuOpened}
      >
        {notifocationsMarkup}
      </Menu>
    </>
  );
}

Notifications.propTypes = {};

export default Notifications;
