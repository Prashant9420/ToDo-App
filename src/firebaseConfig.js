import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDVnOPnGoCyxd8sLD_R8h_9iGjhLlgo9qw",
  authDomain: "react-chatapp-e3bc9.firebaseapp.com",
  databaseURL: "https://react-chatapp-e3bc9-default-rtdb.firebaseio.com",
  projectId: "react-chatapp-e3bc9",
  storageBucket: "react-chatapp-e3bc9.appspot.com",
  messagingSenderId: "286416268674",
  appId: "1:286416268674:web:25a1980a1b00dab445b39b"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);