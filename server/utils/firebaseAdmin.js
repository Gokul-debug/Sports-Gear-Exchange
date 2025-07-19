// server/utils/firebaseAdmin.js
import admin from 'firebase-admin';
console.log("FIREBASE_SERVICE_ACCOUNT_KEY:", process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export default admin;
