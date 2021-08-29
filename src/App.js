import { ThemeProvider } from "@material-ui/core";
import { configureStore } from "@reduxjs/toolkit";
import React, { useState } from "react";
import { IntlProvider } from "react-intl";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Redirect } from "react-router-dom";
import createSagaMiddleware from "redux-saga";
import Customers from "./features/customer";
import Dashboard from "./features/Dashboard";
import Favorite from "./features/favorite";
import Help from "./features/help";
import DoveHome from "./features/Home/DoveHome";
import OnlinePackages from "./features/onlinePackage";
import HajjAdvertisements from "./features/onlinePackage/components/HajjAdvertisements";
import AdvertisementDetail from "./features/onlinePackage/components/AdvertisementDetail";
import ToursAdvertisements from "./features/onlinePackage/components/ToursAdvertisements";
import UmrahAdvertisements from "./features/onlinePackage/components/UmrahAdvertisements";
import Profile from "./features/Profile";
import Register from "./features/Register/Register.j";
import Reservation from "./features/Reservation";
import ForgotPassword from "./features/SignIn/ForgotPassword";
import PrivateRoute from "./features/SignIn/PrivateRoute";
import PublicRoute from "./features/SignIn/PublicRoute";
import SignIn from "./features/SignIn/SignIn";
import SignOut from "./features/SignIn/SignOut";
import Trade from "./features/trade";
import messages_ar from "./lang/ar.json";
import messages_en from "./lang/en.json";
import messages_fr from "./lang/fr.json";
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

const messages = {
  fr: messages_fr,
  ar: messages_ar,
  en: messages_en,
};
const browserLanguage = navigator.language.split(/[-_]/)[0];

function App() {
  const [language, setLanguage] = useState(
    localStorage.getItem("langOverride") || browserLanguage
  );
  const [languageDirection, setLanguageDirection] = useState(
    localStorage.getItem("langOverride") === "ar" ? "rtl" : "ltr"
  );

  const handleLanguageChange = (lang) => {
    if (lang === "ar" && languageDirection !== "rtl") {
      setLanguageDirection("rtl");
    }

    if (lang !== "ar" && languageDirection === "rtl") {
      setLanguageDirection("ltr");
    }
    setLanguage(lang);
    localStorage.setItem("langOverride", lang);
  };

  document.dir = languageDirection;

  return (
    <ThemeProvider theme={defaultTheme}>
      <IntlProvider messages={messages[language]} locale={language}>
        <Router>
          <Provider store={store}>
            <PublicRoute exact path="/">
              <DoveHome />
            </PublicRoute>
            {/* <PublicRoute exact path="/admin">
              <Home onLanguageChange={handleLanguageChange} lang={language} />
            </PublicRoute> */}
            <PublicRoute path="/register">
              <Register />
            </PublicRoute>
            <PublicRoute path="/login">
              <SignIn onLanguageChange={handleLanguageChange} lang={language} />
            </PublicRoute>
            <PublicRoute path="/forgot-password">
              <ForgotPassword />
            </PublicRoute>
            <PublicRoute path="/logout">
              <SignOut />
            </PublicRoute>
            <PublicRoute path="/reserve/:packageName">
              <Reservation
                onLanguageChange={handleLanguageChange}
                lang={language}
              />
            </PublicRoute>
            <PublicRoute exact path="/hajj-packages">
              <HajjAdvertisements />
            </PublicRoute>
            <PublicRoute exact path="/umrah-packages">
              <UmrahAdvertisements />
            </PublicRoute>
            <PublicRoute exact path="/tours">
              <ToursAdvertisements />
            </PublicRoute>
            <PublicRoute exact path="/package/detail/:packageName">
              <AdvertisementDetail />
            </PublicRoute>
            <PrivateRoute path="/caravans">
              <Dashboard />
            </PrivateRoute>
            <PrivateRoute path="/market">
              <OnlinePackages />
            </PrivateRoute>
            <PrivateRoute path="/profile">
              <Profile />
            </PrivateRoute>
            <PrivateRoute path="/trade">
              <Trade />
            </PrivateRoute>
            <PrivateRoute path="/help">
              <Help />
            </PrivateRoute>
            <PrivateRoute path="/:packageName/customers">
              <Customers />
            </PrivateRoute>
            <PrivateRoute path="/favorite">
              <Favorite />
            </PrivateRoute>
            <PublicRoute path="*">
              <Redirect to="/" />
            </PublicRoute>
          </Provider>
        </Router>
      </IntlProvider>
    </ThemeProvider>
  );
}

export default App;
