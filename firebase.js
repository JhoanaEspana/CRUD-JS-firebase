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
  getDoc,
  updateDoc,
} from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  // Put you credentials here

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

export const updateStudent = (id, newFields) => updateDoc(doc(db, 'students', id), newFields);