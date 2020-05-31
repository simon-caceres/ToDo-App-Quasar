import * as firebase from "firebase/app";
import "firebase/firestore";

// Agregar configuración firebase:

const firebaseConfig = {
    apiKey: "AIzaSyAl6YcFPaRoZVrOKeGElOKKyr8_pNncfj0",
    authDomain: "quasar-firebase-f1e4e.firebaseapp.com",
    databaseURL: "https://quasar-firebase-f1e4e.firebaseio.com",
    projectId: "quasar-firebase-f1e4e",
    storageBucket: "quasar-firebase-f1e4e.appspot.com",
    messagingSenderId: "215309389259",
    appId: "1:215309389259:web:8514097c706aa9c0f5ba4e"
  };
  // Initialize Firebase
let firebaseApp = firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();

export { db, firebase };
