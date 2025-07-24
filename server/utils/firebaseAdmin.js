import admin from 'firebase-admin';

function getServiceAccount() {
  // For Render environment variables
  if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
    try {
      // Parse the JSON string from environment variable
      const serviceAccount = JSON.parse(Buffer.from(process.env.FIREBASE_CONFIG_B64, 'base64').toString());
      
      // Ensure newlines in private key are properly formatted
      if (serviceAccount.private_key) {
        serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');
      }
      
      return serviceAccount;
    } catch (error) {
      console.error('Error parsing Firebase service account:', error);
      throw error;
    }
  }
  throw new Error('No Firebase configuration found');
}

// Initialize only once
const firebaseApp = !admin.apps.length 
  ? admin.initializeApp({
      credential: admin.credential.cert(getServiceAccount())
    })
  : admin.app();

console.log('Firebase Admin initialized successfully');
export default firebaseApp;