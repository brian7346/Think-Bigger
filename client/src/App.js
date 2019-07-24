import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import themeFile from 'utils/theme';
import jwtDecode from 'jwt-decode';
import { Provider } from 'react-redux';
import store from './store';
import { SET_AUTHENTICATED } from 'actions/types';
import { loginUserAction, getUserData } from 'actions/userActions';
import axios from 'axios';

// Components
// Компоненты
import { Navbar, AuthRoute } from 'components/';

// Pages
// Страницы
import { Home, Login, Register, User } from 'pages/';

const theme = createMuiTheme(themeFile);

const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem('FBIdToken');
    store.dispatch(loginUserAction());
    window.location.href = '/login';
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
  }
}

function App() {
  return (
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <Router>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/users/:handle" component={User} />
              <Route
                exact
                path="/users/:handle/post/:postId"
                component={User}
              />
              <AuthRoute exact path="/login" component={Login} />
              <AuthRoute exact path="/register" component={Register} />
            </Switch>
          </div>
        </Router>
      </MuiThemeProvider>
    </Provider>
  );
}

export default App;
