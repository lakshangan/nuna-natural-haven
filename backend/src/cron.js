import { supabase } from './config/db.js';
import { sendAbandonedCartNotification } from './services/notification.service.js';

// This function will run periodically to check for abandoned carts
export const startCronJobs = () => {
    console.log("⏰ Initializing Notification Cron Job...");

    // Run every hour (1000ms * 60 * 60)
    setInterval(async () => {
        try {
            console.log("⏰ Running Abandoned Cart Check...");
            
            // Calculate 24 hours ago
            const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
            // Calculate 25 hours ago to avoid spamming the same users
            const twoDaysAgo = new Date(Date.now() - 25 * 60 * 60 * 1000).toISOString();

            // Query Supabase for 'add_to_cart' events from exactly 24 hours ago
            // That also have an fcm_token associated
            const { data, error } = await supabase
                .from('analytics_events')
                .select('product_name, fcm_token, created_at')
                .eq('event_name', 'add_to_cart')
                .not('fcm_token', 'is', null)
                .gte('created_at', twoDaysAgo)
                .lte('created_at', yesterday);

            if (error) throw error;

            if (data && data.length > 0) {
                console.log(`Found ${data.length} abandoned carts to notify.`);
                
                // Using a Set to avoid notifying the same token multiple times
                const notifiedTokens = new Set();
                
                for (let event of data) {
                    if (!notifiedTokens.has(event.fcm_token)) {
                        await sendAbandonedCartNotification(event.fcm_token, event.product_name);
                        notifiedTokens.add(event.fcm_token);
                    }
                }
            } else {
                console.log("No abandoned carts found in the 24 hour window.");
            }

        } catch (error) {
            console.error("Cron Job Error:", error);
        }
    }, 60 * 60 * 1000); // 1 hour interval
};
