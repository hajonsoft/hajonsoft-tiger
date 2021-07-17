import { ThemeProvider } from "@material-ui/core";
import { configureStore } from "@reduxjs/toolkit";
import React, { useState } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { IntlProvider } from 'react-intl';


import createSagaMiddleware from "redux-saga";
import Customers from "./features/customer";
import Dashboard from "./features/Dashboard";
import CustomerHome from "./features/Home/CustomerHome";
import Home from "./features/Home/Home";
import Profile from "./features/Profile";
import Register from "./features/Register/Register.j";
import ForgotPassword from "./features/SignIn/ForgotPassword";
import PrivateRoute from "./features/SignIn/PrivateRoute";
import PublicRoute from "./features/SignIn/PublicRoute";
import SignIn from "./features/SignIn/SignIn";
import SignOut from "./features/SignIn/SignOut";
import OnlinePackages from "./features/onlinePackage";
import HajjPackagesContainer from "./features/onlinePackage/components/HajjPackagesContainer";
import UmrahPackagesContainer from "./features/onlinePackage/components/UmrahPackagesContainer";
import TourPackagesContainer from "./features/onlinePackage/components/TourPackagesContainer";
import PackageDetailCardM3li from "./features/onlinePackage/components/PackageDetailCardM3li";
import reducer from "./redux/reducer";
import sagas from "./redux/saga";
import defaultTheme from "./theme/default";
import Reservation from "./features/Reservation"
import Favorite from './features/favorite';
import messages_ar from './lang/ar.json'
import messages_en from './lang/en.json'
import messages_fr from './lang/fr.json'

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
  devTools: process.env.NODE_ENV !== "production",
});
sagaMiddleware.run(sagas);

const messages = {
  "fr": messages_fr,
  "ar": messages_ar,
  "en": messages_en
}
const browserLanguage = navigator.language.split(/[-_]/)[0];

function App() {

  const [language, setLanguage] = useState(localStorage.getItem('langOverride') || browserLanguage)
  const [languageDirection, setLanguageDirection] = useState(localStorage.getItem('langOverride') === "ar" ? "rtl" : "ltr")

  const handleLanguageChange = (lang) => {
    if (lang === "ar" && languageDirection !== "rtl") {
      setLanguageDirection("rtl")
    }

    if (lang !== "ar" && languageDirection === "rtl") {
      setLanguageDirection("ltr")
    }
    setLanguage(lang);
    localStorage.setItem('langOverride', lang);
  };

  document.dir = languageDirection;

  return (
    <ThemeProvider theme={defaultTheme}>
      <IntlProvider messages={messages[language]} locale={language} >
        <Router>
          <Provider store={store}>
            <PublicRoute exact path="/">
              <CustomerHome />
            </PublicRoute>
            <PublicRoute exact path="/admin">
              <Home onLanguageChange={handleLanguageChange} lang={language}/>
            </PublicRoute>
            <PublicRoute path="/register">
              <Register />
            </PublicRoute>
            <PublicRoute path="/login">
              <SignIn />
            </PublicRoute>
            <PublicRoute path="/forgot-password">
              <ForgotPassword />
            </PublicRoute>
            <PublicRoute path="/logout">
              <SignOut />
            </PublicRoute>
            <PublicRoute path="/reserve/:packageName">
              <Reservation onLanguageChange={handleLanguageChange} lang={language}/>
            </PublicRoute>
            <PublicRoute exact path="/hajj-packages">
              <HajjPackagesContainer />
            </PublicRoute>
            <PublicRoute exact path="/umrah-packages">
              <UmrahPackagesContainer />
            </PublicRoute>
            <PublicRoute exact path="/tours">
              <TourPackagesContainer />
            </PublicRoute>
            <PublicRoute exact path="/package/detail/:packageName">
              <PackageDetailCardM3li />
            </PublicRoute>
            <PrivateRoute path="/groups">
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
            <PrivateRoute path="/favorite">
              <Favorite />
            </PrivateRoute>
          </Provider>
        </Router>
      </IntlProvider>
    </ThemeProvider>
  );
}

export default App;
