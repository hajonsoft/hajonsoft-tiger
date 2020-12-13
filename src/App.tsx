import { ThemeProvider } from "@material-ui/core";
import { configureStore } from "@reduxjs/toolkit";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import createSagaMiddleware from "redux-saga";
import Customers from "./features/customer";
import Dashboard from "./features/Dashboard";
import CustomerHome from "./features/Home/CustomerHome";
import Home from "./features/Home/Home";
import Profile from "./features/Profile/Profile";
import Register from "./features/Register/Register";
import ForgotPassword from "./features/SignIn/ForgotPassword";
import PrivateRoute from "./features/SignIn/PrivateRoute";
import PublicRoute from "./features/SignIn/PublicRoute";
import SignIn from "./features/SignIn/SignIn";
import SignOut from "./features/SignIn/SignOut";
import OnlinePackages from "./features/onlinePackage";

import reducer from "./redux/reducer";
import sagas from "./redux/saga";
import defaultTheme from "./theme/default";

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
    <ThemeProvider theme={defaultTheme}>
      <Router>
        <Provider store={store}>
          <PublicRoute exact path="/" component={CustomerHome} />
          <PublicRoute exact path="/admin" component={Home} />
          <PublicRoute path="/register" component={Register} />
          <PublicRoute path="/login" component={SignIn} />
          <PublicRoute path="/forgot-password" component={ForgotPassword} />
          <PublicRoute path="/logout" component={SignOut} />
          <PrivateRoute path="/dashboard">
            <Dashboard />
          </PrivateRoute>
          <PrivateRoute path="/online">
            <OnlinePackages />
          </PrivateRoute>
          <PrivateRoute path="/profile">
            <Profile />
          </PrivateRoute>
          <PrivateRoute path="/:packageName/customers">
            <Customers />
          </PrivateRoute>
        </Provider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
