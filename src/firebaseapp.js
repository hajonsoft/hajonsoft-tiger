import firebase from 'firebase';
let firebaseConfig = {apiKey: process.env.REACT_APP_FIREBASE_API_KEY, projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID};
const localConfig = localStorage.getItem('firebaseConfig');
if (localConfig) {
    const config = JSON.parse(localConfig)
    firebaseConfig.projectId = config.projectId
    firebaseConfig.apiKey = config.apiKey
} else {
    localStorage.setItem('firebaseConfig', JSON.stringify(firebaseConfig));
}

firebaseConfig.authDomain = `${firebaseConfig.projectId}.firebaseapp.com`
firebaseConfig.databaseURL = `${firebaseConfig.projectId}.firebaseio.com`
firebaseConfig.storageBucket = `${firebaseConfig.projectId}.appspot.com`
 firebaseConfig = {
    apiKey: "AIzaSyBsDMoODcVcS0SB-hHrsbevrHG7x45wpjo",
    authDomain: "hajj-mission-of-cote-de-ivoir.firebaseapp.com",
    databaseURL: "https://hajj-mission-of-cote-de-ivoir.firebaseio.com",
    projectId: "hajj-mission-of-cote-de-ivoir",
    storageBucket: "hajj-mission-of-cote-de-ivoir.appspot.com",
    messagingSenderId: "140613751017",
    appId: "1:140613751017:web:4dd1f64e4b6fc55c2fa078"
  };
firebase.initializeApp(firebaseConfig);
export default firebase;