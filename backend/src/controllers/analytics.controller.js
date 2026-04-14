import { supabase } from '../config/db.js';

export const trackEvent = async (req, res) => {
    try {
        const { event_name, event_data, fcm_token, user_email } = req.body;
        
        const { error } = await supabase
            .from('analytics_events')
            .insert([{ 
                event_name, 
                product_id: event_data?.productId || null,
                product_name: event_data?.name || null,
                event_data: event_data || {},
                fcm_token: fcm_token || null,
                user_email: user_email || null
            }]);

        if (error) {
            console.error('Analytics Insert Error:', error.message);
            // Return 200 anyway so we don't block the frontend
            return res.status(200).json({ message: 'Event tracked (with warning)' });
        }

        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Track Event Error:', error);
        res.status(200).json({ message: 'Error tracked' });
    }
};

export const getCartInsights = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('analytics_events')
            .select('product_id, product_name')
            .eq('event_name', 'add_to_cart');

        if (error) throw error;

        // Group by product
        const insights = {};
        if (data) {
            data.forEach(item => {
                if (!item.product_id) return;
                if (!insights[item.product_id]) {
                    insights[item.product_id] = {
                        id: item.product_id,
                        name: item.product_name,
                        count: 0
                    };
                }
                insights[item.product_id].count += 1;
            });
        }

        const sortedInsights = Object.values(insights).sort((a, b) => b.count - a.count);
        res.status(200).json(sortedInsights);
    } catch (error) {
        console.error('Cart Insights Error:', error);
        res.status(500).json({ message: error.message });
    }
};
