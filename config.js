var firebase = require("firebase/app");

require("firebase/auth");
require("firebase/database");

const firebaseConfig = {
  apiKey: "AIzaSyDEKhQeuxxjjL62EDhPngDFm4iJJukq--Q",
  authDomain: "travo-cf061.firebaseapp.com",
  databaseURL: "https://travo-cf061-default-rtdb.firebaseio.com",
  projectId: "travo-cf061",
  storageBucket: "travo-cf061.appspot.com",
  messagingSenderId: "954933066245",
  appId: "1:954933066245:web:3998f2892e65435654ba6c",
  measurementId: "G-QJF8BQCTWM"
};

firebase.initializeApp(firebaseConfig);
