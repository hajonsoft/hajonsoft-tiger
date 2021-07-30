import firebase from 'firebase';
 const firebaseConfig = {
    apiKey: "AIzaSyCMqQMIkiW2-Z_Iv_4dLpO4ML2-Hf6M3iQ",
    authDomain: "arabic-name.firebaseapp.com",
    databaseURL: "https://arabic-name-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "arabic-name",
    storageBucket: "arabic-name.appspot.com",
    messagingSenderId: "996825677807",
    appId: "1:996825677807:web:11e48b387e3d54eca0801a"
  };

  const firebaseArabic = firebase.initializeApp(firebaseConfig, 'arabic');
  export default firebaseArabic;