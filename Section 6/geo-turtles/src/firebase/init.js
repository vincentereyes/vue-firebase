import firebase from 'firebase'
import firestore from 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyD1RusSDlkaBUVKJgFBowTQgyO2-Gqc2Ss",
    authDomain: "geo-turtles.firebaseapp.com",
    databaseURL: "https://geo-turtles.firebaseio.com",
    projectId: "geo-turtles",
    storageBucket: "geo-turtles.appspot.com",
    messagingSenderId: "1090711377728",
    appId: "1:1090711377728:web:79124eed0de4f68396cca5",
    measurementId: "G-KVX7X19WE4"
  };
  // Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
  firebase.analytics();

export default firebaseApp.firestore()