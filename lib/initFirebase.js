// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyDdydBhl3wqcCpKlYza4Ap-tf7R23FWgy0",
  authDomain: "task-hunt-aa996.firebaseapp.com",
  projectId: "task-hunt-aa996",
  storageBucket: "task-hunt-aa996.appspot.com",
  messagingSenderId: "676729728329",
  appId: "1:676729728329:web:c3e69f89d17864f2c2be98",
  measurementId: "G-8MBLE8FRMM",
};

export default function initFirebase() {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    // Check that `window` is in scope for the analytics module!
    if (typeof window !== "undefined") {
      // Enable analytics. https://firebase.google.com/docs/analytics/get-started
      if ("measurementId" in firebaseConfig) {
        firebase.analytics();
      }
    }
    console.log("Firebase was successfully init.");
  }
}
