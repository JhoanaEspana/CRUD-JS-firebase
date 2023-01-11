// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  onSnapshot,
  doc,
  getDoc
} from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCyc082LMT_FIZevu5_gQiLIYG0VP2EnI4',
  authDomain: 'crud-84fa8.firebaseapp.com',
  projectId: 'crud-84fa8',
  storageBucket: 'crud-84fa8.appspot.com',
  messagingSenderId: '1031781638568',
  appId: '1:1031781638568:web:81a871a7a0842a77a03d9d',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();

export const saveStudent = (
  nombre,
  apellidoPaterno,
  apellidoMaterno,
  telefono,
  correoElectronico,
  descripcion
) => {
  addDoc(collection(db, 'students'), {
    nombre,
    apellidoPaterno,
    apellidoMaterno,
    telefono,
    correoElectronico,
    descripcion,
  });
};

export const getStudents = () => getDocs(collection(db, 'students'));

export const onGetStudent = (callback) =>
  onSnapshot(collection(db, 'students'), callback);

export const deleteStudent = (id) => deleteDoc(doc(db, 'students', id));

export const getStudent = (id) => getDoc(doc(db, 'students', id));           


