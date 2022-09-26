import firebase from "firebase";
import "firebase/storage";

var config = {
  apiKey: "AIzaSyDI93F_ERASvcUd8kkRiE8fPsQs8PVGyxI",
  authDomain: "filly-b757d.firebaseapp.com",
  projectId: "filly-b757d",
  storageBucket: "filly-b757d.appspot.com",
  messagingSenderId: "774030204725",
  appId: "1:774030204725:web:78881c36eb5557d184b67c",
  measurementId: "G-BDDRZYKH74",
};

firebase.initializeApp(config);
firebase.analytics();

export default firebase;
