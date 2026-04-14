import { BACKEND_URL } from './api-config';

export type TrackingEvent = 'add_to_cart' | 'remove_from_cart' | 'purchase';

export const trackEvent = async (eventName: TrackingEvent, eventData?: Record<string, any>) => {
  console.log(`[Analytics] Tracked Event: ${eventName}`, eventData || {});
  
  try {
    let fcmToken: string | null = null;
    let userEmail: string | null = null;

    if (typeof window !== 'undefined') {
      fcmToken = localStorage.getItem('nuna_fcm_token');
      // Try to get the logged-in user's email from localStorage
      const rawUser = localStorage.getItem('nuna_user');
      if (rawUser) {
        try { userEmail = JSON.parse(rawUser)?.email || null; } catch {}
      }
    }

    fetch(`${BACKEND_URL}/api/analytics/track`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        event_name: eventName, 
        event_data: eventData || {},
        fcm_token: fcmToken,
        user_email: userEmail
      })
    }).catch(() => {});
  } catch (err) {
    // Ignore tracking errors
  }
};
