import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  apiKey: "AIzaSyBQRJmisVn3Ul9CkY7B8i1owgE9O-N2rJc",
  authDomain: "instagram-clone-54bbf.firebaseapp.com",
  databaseURL: "https://instagram-clone-54bbf-default-rtdb.firebaseio.com",
  projectId: "instagram-clone-54bbf",
  storageBucket: "instagram-clone-54bbf.appspot.com",
  messagingSenderId: "51964669390",
  appId: "1:51964669390:web:f77fd0f4545e9141dccf9f",
  measurementId: "G-930JB8E3EB",
});

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = firebaseApp.storage();

export { db, auth, storage };
