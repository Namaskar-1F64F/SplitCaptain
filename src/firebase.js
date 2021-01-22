import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { getShipName } from "./ship/ships";

if (!firebase.apps.length)
  firebase.initializeApp({
    apiKey: "AIzaSyCxmvMuffIsq7whYJaS34qIbxQRE4at7DI",
    authDomain: "split-captain.firebaseapp.com",
    databaseURL: "https://split-captain.firebaseio.com",
    projectId: "split-captain",
    storageBucket: "split-captain.appspot.com",
    messagingSenderId: "1017946707901",
    appId: "1:1017946707901:web:8a57d1736392b5f78c24d4",
  });

export { firebase };

export const db = firebase.firestore();
export const auth = firebase.auth();

