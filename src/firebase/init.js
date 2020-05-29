import firebase from 'firebase';
import firestore from 'firebase/firestore';




// Your web app's Firebase configuration
 var firebaseConfig = {
    apiKey: "AIzaSyC1nr_5HlH8IE2zsTIf5JRNFVWI3CN8njE",
    authDomain: "lets-chat-b1517.firebaseapp.com",
    databaseURL: "https://lets-chat-b1517.firebaseio.com",
    projectId: "lets-chat-b1517",
    storageBucket: "lets-chat-b1517.appspot.com",
    messagingSenderId: "21260162890",
    appId: "1:21260162890:web:c7d5548170291f5cb1d3b3"
  };
  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig);

  export default firebaseApp.firestore();