// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import.meta.env;  
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
//Congiguracion para tomar las claves desde la variable de entorno en el archivo .env.local usando vite
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_LISTA_GASTOS_API_KEY,
  authDomain: import.meta.env.VITE_APP_LISTA_GASTOS_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_APP_LISTA_GASTOS_PROJECT_ID,
  storageBucket: import.meta.env.VITE_APP_LISTA_GASTOS_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_APP_LISTA_GASTOS_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_LISTA_GASTOS_APP_ID
};

/* const firebaseConfig = {
  apiKey: "AIzaSyAW4IjqdczWCzzc9nON9nOp3Og6-vk5M_E",
  authDomain: "react-app-lista-gastos-7b7ca.firebaseapp.com",
  projectId: "react-app-lista-gastos-7b7ca",
  storageBucket: "react-app-lista-gastos-7b7ca.appspot.com",
  messagingSenderId: "398868315566",
  appId: "1:398868315566:web:8a0151ebb6375155121c3f"
}; */

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export {db, auth};