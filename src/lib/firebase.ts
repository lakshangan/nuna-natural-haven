import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

// Your web app's Firebase configuration
const firebaseConfig = {
  projectId: "nunaorganic-ca8f3",
  messagingSenderId: "438809052939",
  
  // ⚠️ YOU MUST REPLACE THESE WITH YOUR ACTUAL FIREBASE SECRETS
  apiKey: "AIzaSyDXhsXlEXHTOxo8l_URl4PPyLX8mR5sqUk",
  appId: "1:438809052939:web:804618f00c20aef8fe840e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Cloud Messaging
let messaging: ReturnType<typeof getMessaging> | null = null;

if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
  // We only initialize messaging if it's supported in the browser
  messaging = getMessaging(app);
}

// Your VAPID Key provided by you
const VAPID_KEY = "BNDSGa5HreCd7k1s_WLNvF6sz7NsqYEG_9c8QaOWwEKlR7SgOuG981fISNhjH_cQ0IUQaifDa0eFE8R8g6j4Ivc";

export const requestForFcmToken = async () => {
  if (!messaging) return null;
  
  try {
    const currentToken = await getToken(messaging, { vapidKey: VAPID_KEY });
    if (currentToken) {
      console.log('Firebase Cloud Messaging Token:', currentToken);
      // Save it locally so analytics tracker can attach it to cart events
      localStorage.setItem('nuna_fcm_token', currentToken);
      return currentToken;
    } else {
      console.warn('No registration token available. Request permission to generate one.');
      return null;
    }
  } catch (err) {
    console.error('An error occurred while retrieving token. ', err);
    return null;
  }
};

export const onMessageListener = () => {
  if (!messaging) return new Promise((resolve) => resolve(null));
  
  return new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
};
