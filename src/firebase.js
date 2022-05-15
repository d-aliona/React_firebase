import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDKneP5pggEthlf72_RtvUwdBdFNoypNm8",
  authDomain: "todo-project-ac091.firebaseapp.com",
  projectId: "todo-project-ac091",
  storageBucket: "todo-project-ac091.appspot.com",
  messagingSenderId: "739794298595",
  appId: "1:739794298595:web:81a55289c2f9b81f5887d6",
  measurementId: "G-0B2K08MZBY"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app)

export {db, auth};