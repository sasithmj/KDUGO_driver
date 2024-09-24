import {initializeApp, getApps} from 'firebase/app';
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from 'firebase/auth';
import {getStorage} from 'firebase/storage';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import {getFirestore} from 'firebase/firestore';

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: 'AIzaSyDi6N7qlRYtQZwKk8hiRZ5LcDSfu6SP8Mw',
  authDomain: 'newkdugo.firebaseapp.com',
  databaseURL: 'https://newkdugo-default-rtdb.firebaseio.com',
  projectId: 'newkdugo',
  storageBucket: 'newkdugo.appspot.com',
  messagingSenderId: '120240812673',
  appId: '1:120240812673:web:81073cca67a9789409d380',
  measurementId: 'G-6LKQ6WDJ1P',
};

// Initialize Firebase
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

// Initialize Firebase Authentication with AsyncStorage persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

// Initialize Firebase Storage
const storage = getStorage(app);

// Initialize Firestore
const db = getFirestore(app);

export {auth, storage, db};
