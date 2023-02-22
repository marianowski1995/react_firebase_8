import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDGP3GTFiYMfsjB9GZm_oE2a3jziki9iwU',
  authDomain: 'course-projects-40eaa.firebaseapp.com',
  projectId: 'course-projects-40eaa',
  storageBucket: 'course-projects-40eaa.appspot.com',
  messagingSenderId: '606193761484',
  appId: '1:606193761484:web:688f7a2e203c92d0a25669',
};

firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();

export { firestore };
