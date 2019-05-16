import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
const config = {
  apiKey: "AIzaSyAB8Zm_W4n1EQPy69SYHyE6HS4V3Xh8Q2Q",
  authDomain: "todoapp-bf8f6.firebaseapp.com",
  databaseURL: "https://todoapp-bf8f6.firebaseio.com",
  projectId: "todoapp-bf8f6",
  storageBucket: "todoapp-bf8f6.appspot.com",
  messagingSenderId: "262852673437",
  appId: "1:262852673437:web:98b0b3d07db900ae"
};
// Initialize Firebase
firebase.initializeApp(config);
// firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase;
