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

import { voyage, excursion } from "./store";

let params = (new URL(window.location)).searchParams;
const excursionId = params.get("e");
const voyageId = params.get("v");
let voyageRef;
if (excursionId) {
  voyageRef = db.doc(`/voyages/${voyageId}`);
} else {
  // TODO unhard code this. This is set so that it always users this voyage ID
  // It will be useful for testing, and we can consider the below ID our mexico voyage
    voyageRef = db.collection("voyages").doc('n3jonjH3ldmsK7S4vANf');
  // voyageRef = db.collection("voyages").doc();
}
voyage.set(voyageRef);



let excursionRef


if (voyageId && excursionId) {
  excursionRef = db.doc(`/voyages/${voyageId}/excursions/${excursionId}`);
} else {
  excursionRef = voyageRef.collection('excursions').doc();
}
excursion.set(excursionRef);

const crewmateRef = voyageRef.collection("crewmates");
auth.signInAnonymously().then(({ user: { id } }) => {
  db.doc(`mariners/${id}`)
    .get()
    .then((snapshot) => {
      if (!snapshot.exists) {
        snapshot.ref.set({ name: getShipName() });
      }
    })
    .then(() => {
      voyageRef.set({ date: new Date() }, { merge: true });
      db.doc(`mariners/${id}`)
        .get()
        .then((mariner) => {
          crewmateRef.doc(id).set({ ...mariner.data() });
        });
    });
});
