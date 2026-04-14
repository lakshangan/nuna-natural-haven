import { BACKEND_URL } from './api-config';

export type TrackingEvent = 'add_to_cart' | 'remove_from_cart' | 'purchase';

export const trackEvent = async (eventName: TrackingEvent, eventData?: Record<string, any>) => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(`[Analytics] Tracked Event: ${eventName}`, eventData || {});
  }
  
  try {
    // Attempt to grab FCM token from localStorage if the user opted in previously
    let fcmToken = null;
    if (typeof window !== 'undefined') {
      fcmToken = localStorage.getItem('nuna_fcm_token');
    }

    // Fire and forget to our custom backend analytics endpoint
    fetch(`${BACKEND_URL}/api/analytics/track`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        event_name: eventName, 
        event_data: eventData || {},
        fcm_token: fcmToken // Required for abandoned cart push notification!
      })
    }).catch(() => {}); // silently catch network errors to not interrupt UI
  } catch (err) {
    // Ignore tracking errors
  }
};
