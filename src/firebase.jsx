import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: 'AIzaSyDLlzV_k2rXQdpYda5MpttmYPlSsNJnM3s',
    authDomain: 'auth-example-e2aee.firebaseapp.com',
    projectId: 'auth-example-e2aee',
    storageBucket: 'auth-example-e2aee.appspot.com',
    messagingSenderId: '418951460460',
    appId: '1:418951460460:web:954f0d151c5fdc326eca49'
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };
