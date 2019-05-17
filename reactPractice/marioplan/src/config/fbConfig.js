import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { configKey } from "./config";
const config = {
  apiKey: configKey.apiKey,
  authDomain: "todoapp-bf8f6.firebaseapp.com",
  databaseURL: configKey.databaseURL,
  projectId: "todoapp-bf8f6",
  storageBucket: "todoapp-bf8f6.appspot.com",
  messagingSenderId: configKey.messagingSenderId,
  appId: configKey.appId
};
// Initialize Firebase
firebase.initializeApp(config);
// firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase;
