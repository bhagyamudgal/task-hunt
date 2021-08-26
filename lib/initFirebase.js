// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";

// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

var firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
};

export default function initFirebase() {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    // Check that `window` is in scope for the analytics module!
    cosnole.log(firebaseConfig);
    console.log("Firebase was successfully init.");
  }
}
