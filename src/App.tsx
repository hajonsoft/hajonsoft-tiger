import {
  createMuiTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@material-ui/core";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { applyMiddleware, compose, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import Dashboard from "./features/Dashboard/Dashboard";
import Home from "./features/Home/Home";
import Profile from "./features/Profile/Profile";
import Register from "./features/Register/Register";
import ForgotPassword from "./features/SignIn/ForgotPassword";
import PrivateRoute from "./features/SignIn/PrivateRoute";
import PublicRoute from "./features/SignIn/PublicRoute";
import SignIn from "./features/SignIn/SignIn";
import SignOut from "./features/SignIn/SignOut";
import reducer from "./redux/reducer";
import sagas from "./redux/saga";

let defaultTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#0089C7",
    },
    secondary: {
      main: "#4D5C64",
    },
    error: {
      main: "#C13636",
    },
    warning: {
      main: "#EAD432",
    },
    success: {
      main: "#45AD1E",
    },
    info: {
      main: "#0EA4CC",
    },
  },
});

defaultTheme = responsiveFontSizes(defaultTheme);
const sagaMiddleware = createSagaMiddleware();
const reduxDevtoolsCompose = (window as any)
  .__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const composeEnhancers =
  (reduxDevtoolsCompose && reduxDevtoolsCompose({ trace: true })) || compose;
const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(sagas);

function App() {
  return (
    <div>
      <ThemeProvider theme={defaultTheme}>
        <Router>
          <Provider store={store}>
            <PublicRoute exact path="/" component={Home} />
            <PublicRoute exact path="/profile" component={Profile} />
            <PublicRoute exact path="/register" component={Register} />
            <PublicRoute exact path="/login" component={SignIn} />
            <PublicRoute
              exact
              path="/forgot-password"
              component={ForgotPassword}
            />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PublicRoute exact path="/logout" component={SignOut} />
          </Provider>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
