import admin from 'firebase-admin';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

try {
    const serviceAccount = require('../../serviceAccountKey.json');
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
    console.log("🔥 Firebase Admin Initialized successfully");
} catch (err) {
    console.log("Firebase Admin not initialized yet. Needs serviceAccountKey.json", err);
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
