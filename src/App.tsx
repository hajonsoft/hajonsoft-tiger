import {
  createMuiTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@material-ui/core";
import { configureStore } from "@reduxjs/toolkit";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import createSagaMiddleware from "redux-saga";
import Customers from "./features/customer";
import Dashboard from "./features/Dashboard";
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
      main: "#3E95DC", //summer sky
    },
    secondary: {
      main: "#57240F", // Seal brown
    },
    error: {
      main: "#ff5a5f", // sizzling red
    },
    warning: {
      main: "#033f63", //Inch worm
    },
    success: {
      main: "#9e2b25", // hunter green
    },
    info: {
      main: "#42F2F7", //Aqua
    },
  },
});

defaultTheme = responsiveFontSizes(defaultTheme);
const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
  devTools: process.env.NODE_ENV !== "production",
});
sagaMiddleware.run(sagas);

function App() {
  return (
    <div>
      <ThemeProvider theme={defaultTheme}>
        <Router>
          <Provider store={store}>
            <PublicRoute exact path="/" component={Home} />
            <PublicRoute path="/register" component={Register} />
            <PublicRoute path="/login" component={SignIn} />
            <PublicRoute path="/forgot-password" component={ForgotPassword} />
            <PublicRoute path="/logout" component={SignOut} />
            <PrivateRoute path="/dashboard">
              <Dashboard />
            </PrivateRoute>
            <PrivateRoute path="/profile">
              <Profile />
            </PrivateRoute>
            <PrivateRoute path="/package/:packageName/customers">
              <Customers />
            </PrivateRoute>
          </Provider>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
