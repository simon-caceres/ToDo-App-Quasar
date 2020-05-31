import * as firebase from "firebase/app";
import "firebase/firestore";

// Agregar configuración firebase:

const firebaseConfig = {

  };
  // Initialize Firebase
let firebaseApp = firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();

export { db, firebase };
