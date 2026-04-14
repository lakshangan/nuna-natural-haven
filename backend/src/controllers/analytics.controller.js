import { supabase } from '../config/db.js';

export const trackEvent = async (req, res) => {
    try {
        const { event_name, event_data, fcm_token } = req.body;
        
        const { error } = await supabase
            .from('analytics_events')
            .insert([{ 
                event_name, 
                product_id: event_data?.productId || null,
                product_name: event_data?.name || null,
                event_data: event_data || {},
                fcm_token: fcm_token || null
            }]);

        if (error) {
            console.error('Analytics Insert Error (May need table creation):', error.message);
            // We return 200 anyway so we don't block the frontend
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
        // Query to find how many times each product is in someone's cart
        // We aggregate the 'add_to_cart' minus 'remove_from_cart' or purchase.
        // For simplicity, we count total 'add_to_cart' events to show interest.
        
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
