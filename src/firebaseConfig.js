import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDgVYlPTWVYJaJmsUfFLfEBtVgF_sfvOgQ',
  authDomain: 'fir-test-68b9d.firebaseapp.com',
  projectId: 'fir-test-68b9d',
  storageBucket: 'fir-test-68b9d.appspot.com',
  messagingSenderId: '249437221460',
  appId: '1:249437221460:web:ab5ba7f463959dfe10b3c1'
};

export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
export const storage = getStorage(app);
