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
firebase.initializeApp(firebaseConfig);
export default firebase;