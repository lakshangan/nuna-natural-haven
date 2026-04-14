importScripts('https://www.gstatic.com/firebasejs/10.9.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.9.0/firebase-messaging-compat.js');

const firebaseConfig = {
  projectId: "nunaorganic-ca8f3",
  messagingSenderId: "438809052939",
  
  // ⚠️ YOU MUST REPLACE THESE WITH YOUR ACTUAL FIREBASE SECRETS
  apiKey: "AIzaSyDXhsXlEXHTOxo8l_URl4PPyLX8mR5sqUk",
  appId: "1:438809052939:web:804618f00c20aef8fe840e"
};

// Initialize Firebase in the service worker
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  
  const notificationTitle = payload.notification?.title || 'New Notification';
  const notificationOptions = {
    body: payload.notification?.body,
    icon: '/favicon.ico' // Or path to your logo
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
