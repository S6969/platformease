import { FirebaseOptions } from "firebase/app";

// Firebase configuration using environment variables
export const firebaseConfig: FirebaseOptions = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Required configuration keys
export const requiredConfigKeys = [
  'apiKey',
  'authDomain',
  'projectId',
  'storageBucket',
  'messagingSenderId',
  'appId',
  'measurementId'
] as const;

// Validate Firebase configuration
export const validateFirebaseConfig = (config: FirebaseOptions): void => {
  const missingKeys = requiredConfigKeys.filter(key => !config[key]);
  if (missingKeys.length > 0) {
    throw new Error(`Missing required Firebase configuration keys: ${missingKeys.join(', ')}`);
  }
}; 