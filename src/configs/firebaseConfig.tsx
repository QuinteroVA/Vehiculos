import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';


const firebaseConfig = {
  apiKey: "AIzaSyAp-xLQqM7JCOmmP2HWyJR5O08YTef7NCs",
  authDomain: "vehiculos-d2d5e.firebaseapp.com",
  projectId: "vehiculos-d2d5e",
  storageBucket: "vehiculos-d2d5e.appspot.com",
  messagingSenderId: "806749956864",
  appId: "1:806749956864:web:ef3b86bd739784d7a4a1e5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});