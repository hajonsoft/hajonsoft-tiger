import { ThemeProvider } from "@material-ui/core";
import React, { useState } from "react";
import { IntlProvider } from "react-intl";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Dashboard from "./features/Dashboard";
import Favorite from "./features/favorite";
import Help from "./features/help";
import DoveHome from "./features/Home/DoveHome";
import OnlinePackages from "./features/onlineCaravan";
import AdvertisementDetail from "./features/onlineCaravan/components/AdvertisementDetail";
import HajjAdvertisements from "./features/onlineCaravan/components/HajjAdvertisements";
import ToursAdvertisements from "./features/onlineCaravan/components/ToursAdvertisements";
import UmrahAdvertisements from "./features/onlineCaravan/components/UmrahAdvertisements";
import Passengers from "./features/passengers";
import Profile from "./features/Profile/index";
import Reservation from "./features/Reservation";
import PrivateRoute from "./features/SignIn/PrivateRoute";
import PublicRoute from "./features/SignIn/PublicRoute";
import SignIn from "./features/SignIn/SignIn";
import SignOut from "./features/SignIn/SignOut";
import Trade from "./features/trade";
import messages_ar from "./lang/ar.json";
import messages_en from "./lang/en.json";
import messages_fr from "./lang/fr.json";
import { store } from './redux/store';
import defaultTheme from "./theme/default";

const messages = {
  fr: messages_fr,
  ar: messages_ar,
  en: messages_en,
};
const browserLanguage = () => {

  const navigatorLang = navigator.language.split(/[-_]/)[0];
  if (navigatorLang === "en" || navigatorLang === "ar" || navigatorLang === "fr") {
    return navigatorLang;
  }
  return 'en'
}

function getSupportedLanguage() {
  const language = localStorage.getItem("langOverride") || browserLanguage();
  const supportedLanguge = "en";
  if (language === "ar" || language === "en" || language === "fr"){
    return language
  } else {
    return supportedLanguge;
  }

}

function App() {
  const [language, setLanguage] = useState(getSupportedLanguage()
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
    const supportedLanguage = "en";
    if (lang === "ar" || lang === "en" || lang === "fr"){
      setLanguage(lang);
      localStorage.setItem("langOverride", lang);
    } else {
      setLanguage(supportedLanguage);
      localStorage.setItem("langOverride", supportedLanguage);
    }

  };

  document.dir = languageDirection;

  return (
    <ThemeProvider theme={defaultTheme}>
      <IntlProvider messages={messages[language]} locale={language}>
        <Router>
          <Provider store={store}>
            <PublicRoute exact path="/">
              <DoveHome onLanguageChange={(l) => handleLanguageChange(l)} lang={language} />
            </PublicRoute>
            <PublicRoute path="/login">
              <SignIn onLanguageChange={(l) => handleLanguageChange(l)} lang={language} />
            </PublicRoute>
            <PublicRoute path="/logout">
              <SignOut />
            </PublicRoute>
            <Route path="/reserve/:packageName" >
              <Reservation
                onLanguageChange={(l) => handleLanguageChange(l)}
                lang={language}
              />
            </Route>
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
              <AdvertisementDetail onLanguageChange={(l) => handleLanguageChange(l)} lang={language} />
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
              <Passengers />
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
