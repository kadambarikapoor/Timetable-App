import firebase from 'firebase';
require('@firebase/firestore')

var firebaseConfig = {
    apiKey: "AIzaSyDvWdr9XuIuKQxFmzhIlfu0uqFr4ClcTuk",
    authDomain: "timetable-app-ff2f2.firebaseapp.com",
    projectId: "timetable-app-ff2f2",
    storageBucket: "timetable-app-ff2f2.appspot.com",
    messagingSenderId: "1028354416726",
    appId: "1:1028354416726:web:46055e8f052f227d07dbf7",
    measurementId: "G-8SBS41V5RB"
  };
  // Initialize Firebase

  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();
