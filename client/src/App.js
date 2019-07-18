import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import themeFile from "utils/theme";
import jwtDecode from "jwt-decode";
import { Provider } from "react-redux";
import store from "./store";

// Components
// Компоненты
import { Navbar, AuthRoute } from "components/";

// Pages
// Страницы
import { Home, Login, Register } from "pages/";

const theme = createMuiTheme(themeFile);

const token = localStorage.FBIdToken;

let authenticated;
if (token) {
  const decodedToken = jwtDecode(token);

  if (decodedToken.exp * 1000 < Date.now()) {
    window.location.href = "/login";
    authenticated = false;
  } else {
    authenticated = true;
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
              <AuthRoute
                exact
                path="/login"
                component={Login}
                authenticated={authenticated}
              />
              <AuthRoute
                exact
                path="/register"
                component={Register}
                authenticated={authenticated}
              />
            </Switch>
          </div>
        </Router>
      </MuiThemeProvider>
    </Provider>
  );
}

export default App;
