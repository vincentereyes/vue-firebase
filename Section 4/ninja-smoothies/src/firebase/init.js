import firebase from 'firebase'
import firestore from 'firebase/firestore'
// Your web app's Firebase configuration
 var firebaseConfig = {
    apiKey: "AIzaSyDN14qnxYmk10X2D9NhsDCPPRZbbjwZNSY",
    authDomain: "vince-ninja-smoothies.firebaseapp.com",
    databaseURL: "https://vince-ninja-smoothies.firebaseio.com",
    projectId: "vince-ninja-smoothies",
    storageBucket: "vince-ninja-smoothies.appspot.com",
    messagingSenderId: "540728112167",
    appId: "1:540728112167:web:4e018bbd8a6207b6aa4a02",
    measurementId: "G-SEEFJG103G"
  };
  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  //export firestore database
  export default firebaseApp.firestore()