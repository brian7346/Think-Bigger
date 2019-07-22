import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import HomeIcon from '@material-ui/icons/Home';
import Notifications from '@material-ui/icons/Notifications';

import { MyButton } from '.';

function Navbar() {
  const authenticated = useSelector(state => state.user.authenticated);

  return (
    <AppBar>
      <Toolbar className="nav-container">
        {authenticated ? (
          <>
            <MyButton tip="Create post">
              <AddIcon />
            </MyButton>
            <Link to="/">
              <MyButton tip="Home">
                <HomeIcon />
              </MyButton>
            </Link>
            <MyButton tip="Notifications">
              <Notifications />
            </MyButton>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/register">
              Register
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
