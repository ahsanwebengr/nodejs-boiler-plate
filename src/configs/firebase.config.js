import admin from 'firebase-admin';
import { FIREBASE_CONFIG } from './env.config.js';

export const fireBaseAdminConfig = admin.initializeApp({
  credential: admin.credential.cert(FIREBASE_CONFIG)
});
