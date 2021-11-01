import firebase from 'firebase';
import 'firebase/analytics';
const firebaseConfig = {
  apiKey: "AIzaSyBGyDjRhrOXJfxKmHNhGqN9TSicwRQoQkc",
  authDomain: "hajonsoftcom.firebaseapp.com",
  projectId: "hajonsoftcom",
  storageBucket: "hajonsoftcom.appspot.com",
  messagingSenderId: "1018211897938",
  appId: "1:1018211897938:web:1d871e7a88455ba4d6458b",
  measurementId: "G-T6V683N6BZ"
};

const firebaseAnalytics = firebase.initializeApp(firebaseConfig, 'analytics');
export const analytics = firebase.analytics();
export default firebaseAnalytics;