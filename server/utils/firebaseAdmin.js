// server/utils/firebaseAdmin.js
import admin from 'firebase-admin';

// ✅ Unescape newline characters in the Firebase key string
const rawKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
const cleanedKey = rawKey.replace(/\\n/g, '\n');

// ✅ Safely parse JSON
const serviceAccount = JSON.parse(cleanedKey);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export default admin;