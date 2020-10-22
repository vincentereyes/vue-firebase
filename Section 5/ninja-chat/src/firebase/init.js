import firebase from 'firebase'

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAtC-6WyBMZ4cvqdjT-sg3LbpPMFEw2MFM",
    authDomain: "ninj-chat.firebaseapp.com",
    databaseURL: "https://ninj-chat.firebaseio.com",
    projectId: "ninj-chat",
    storageBucket: "ninj-chat.appspot.com",
    messagingSenderId: "874723040789",
    appId: "1:874723040789:web:5cc6acc3ad642b7212f81c",
    measurementId: "G-1QQ3LT8EP7"
  };
  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  firebase.analytics();

export default firebaseApp.firestore()