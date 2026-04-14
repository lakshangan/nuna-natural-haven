import admin from 'firebase-admin';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

let serviceAccount;

try {
    if (process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
        serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
    } else if (process.env.FIREBASE_SERVICE_ACCOUNT_BASE64) {
        serviceAccount = JSON.parse(Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_BASE64, 'base64').toString('ascii'));
    } else {
        serviceAccount = require('../../serviceAccountKey.json');
    }

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
    console.log("🔥 Firebase Admin Initialized successfully");
} catch (err) {
    console.warn("⚠️ Firebase Admin not initialized. Provide FIREBASE_SERVICE_ACCOUNT_JSON env var or serviceAccountKey.json file.");
}

export const sendPurchaseSuccessNotification = async (fcmToken) => {
    if (!fcmToken) return;

    const message = {
        notification: {
            title: 'Thank you for your purchase! 🌿',
            body: 'Your natural botanical order is being processed and will ship soon.'
        },
        token: fcmToken
    };

    try {
        const response = await admin.messaging().send(message);
        console.log('Successfully sent purchase message:', response);
    } catch (error) {
        console.error('Error sending purchase message:', error);
    }
};

export const sendAbandonedCartNotification = async (fcmToken, productName) => {
    if (!fcmToken) return;

    const message = {
        notification: {
            title: 'Wait! You left something behind 🛒',
            body: `Your ${productName || 'favorite natural product'} is waiting for you. Complete your purchase now for a special 10% OFF!`
        },
        token: fcmToken
    };

    try {
        const response = await admin.messaging().send(message);
        console.log('Successfully sent abandoned cart message:', response);
    } catch (error) {
        console.error('Error sending abandoned cart message:', error);
    }
};
