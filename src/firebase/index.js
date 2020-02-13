import app from 'firebase/app';
import 'firebase/firestore';

import Database from './Database';

// api demo
// https://firebase.google.com/docs/firestore/manage-data/add-data

// dev config
const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};


app.initializeApp(config);

export const database = new Database(app);
export const auth = null;
