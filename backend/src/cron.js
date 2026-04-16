import { supabase } from './config/db.js';
import { sendAbandonedCartEmail } from './services/email.service.js';

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
            const { data, error } = await supabase
                .from('analytics_events')
                .select('product_name, fcm_token, user_email, created_at')
                .eq('event_name', 'add_to_cart')
                .gte('created_at', twoDaysAgo)
                .lte('created_at', yesterday);

            if (error) throw error;

            if (data && data.length > 0) {
                console.log(`Found ${data.length} abandoned cart events to check.`);
                
                const notifiedEmails = new Set();
                
                for (let event of data) {
                    // Send abandoned cart EMAIL if user_email exists
                    if (event.user_email && !notifiedEmails.has(event.user_email)) {
                        await sendAbandonedCartEmail({
                            toEmail: event.user_email,
                            productName: event.product_name
                        });
                        notifiedEmails.add(event.user_email);
                    }
                }

                console.log(`✅ Notified ${notifiedEmails.size} users via email.`);
            } else {
                console.log("No abandoned carts found in the 24 hour window.");
            }

        } catch (error) {
            console.error("Cron Job Error:", error);
        }
    }, 60 * 60 * 1000); // 1 hour interval
};
