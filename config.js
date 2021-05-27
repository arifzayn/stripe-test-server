// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
var firebase = require("firebase/app");

// Add the Firebase products that you want to use
require("firebase/auth");

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDEKhQeuxxjjL62EDhPngDFm4iJJukq--Q",
  authDomain: "travo-cf061.firebaseapp.com",
  projectId: "travo-cf061",
  storageBucket: "travo-cf061.appspot.com",
  messagingSenderId: "954933066245",
  appId: "1:954933066245:web:3998f2892e65435654ba6c",
  measurementId: "G-QJF8BQCTWM",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
