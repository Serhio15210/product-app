import { initializeApp } from "firebase/app";
import "firebase/database";
import { getDatabase } from "@firebase/database";
import {
  EXPO_API_KEY,
  EXPO_AUTH_DOMAIN,
  EXPO_DATABASE_URL,
  EXPO_PROJECT_ID,
  EXPO_STORAGE_BUCKET,
  EXPO_MESSAGE_SENDER_ID,
  EXPO_APP_ID,
  EXPO_MEASUREMENT_ID,
  // eslint-disable-next-line import/no-unresolved
} from "@env";

// Firebase configuration
const firebaseConfig = {
  apiKey: EXPO_API_KEY,
  authDomain: EXPO_AUTH_DOMAIN,
  databaseURL: EXPO_DATABASE_URL,
  projectId: EXPO_PROJECT_ID,
  storageBucket: EXPO_STORAGE_BUCKET,
  messagingSenderId: EXPO_MESSAGE_SENDER_ID,
  appId: EXPO_APP_ID,
  measurementId: EXPO_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
