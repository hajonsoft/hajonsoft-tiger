import firebase from 'firebase';

const {
    REACT_APP_FIREBASE_API_KEY,
    REACT_APP_AUTH_DOMAIN,
    REACT_APP_DATABASE_URL,
    REACT_APP_PROJECT_ID,
    REACT_APP_STORAGE_BUCKET,
    REACT_APP_MESSAGING_SENDER_ID,
    REACT_APP_APP_ID,
    REACT_APP_MEASUREMENT_ID,
} = process.env;

let firebaseConfig = {
    apiKey: REACT_APP_FIREBASE_API_KEY,
    authDomain: REACT_APP_AUTH_DOMAIN,
    databaseURL: REACT_APP_DATABASE_URL,
    projectId: REACT_APP_PROJECT_ID,
    storageBucket: REACT_APP_STORAGE_BUCKET,
    messagingSenderId: REACT_APP_MESSAGING_SENDER_ID,
    appId: REACT_APP_APP_ID,
    measurementId: REACT_APP_MEASUREMENT_ID,
};


const localConfig = localStorage.getItem('firebaseConfig');
if (localConfig){
    const config = JSON.parse(localConfig)
    config.authDomain = config.authDomain || `${config.projectId}.firebaseapp.com`
    config.databaseURL = config.databaseURL || `${config.projectId}.firebaseio.com`
    config.storageBucket = config.storageBucket || `${config.projectId}.appspot.com`
    config.apiKey = config.webapiKey
    firebaseConfig = config;
}
firebase.initializeApp(firebaseConfig);
export default firebase;