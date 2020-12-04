import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/performance";
import "firebase/analytics";
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

import { voyage } from "./store";
const queryId = window.location.search.split("i=")?.[1];
let voyageRef;
if (queryId) {
  voyageRef = db.doc(`/voyage/${queryId}`);
} else {
  voyageRef = db.collection("voyage").doc();
}
voyage.set(voyageRef);
const crewmateRef = voyageRef.collection("crewmate");
auth.signInAnonymously().then(({ user: { uid } }) => {
  db.doc(`mariner/${uid}`)
    .get()
    .then((snapshot) => {
      if (!snapshot.exists) {
        snapshot.ref.set({ name: getShipName() });
      }
    })
    .then(() => {
      voyageRef.set({ date: new Date() }, { merge: true });
      db.doc(`mariner/${uid}`)
        .get()
        .then((mariner) => {
          crewmateRef.doc(uid).set({ ...mariner.data(), uid });
        });
    });
});
