import admin from 'firebase-admin';

// NOTE: You MUST download your Firebase Admin SDK serviceAccountKey.json 
// from your Firebase Project Settings -> Service Accounts -> "Generate new private key"
// and place it in the backend folder, or use environment variables!
try {
    // For demonstration, we attempt to initialize with a file or placeholder.
    // Replace this logic with your actual service account credential setup.
    // import serviceAccount from '../../serviceAccountKey.json' assert { type: "json" };
    // admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
} catch (err) {
    console.log("Firebase Admin not initialized yet. Needs serviceAccountKey.json");
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
