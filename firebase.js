import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBViXSPshmStn0TMmb8uIE2m-JNUjAoE6o",
  authDomain: "scheduleme-97.firebaseapp.com",
  projectId: "scheduleme-97",
  storageBucket: "scheduleme-97.appspot.com",
  messagingSenderId: "155781385430",
  appId: "1:155781385430:web:ea3860e618f45f9e9c0d77"
};

let app;
if( firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
}
else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();
export {
  db,
  auth,
};

