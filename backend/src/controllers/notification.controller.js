import { sendPurchaseSuccessNotification } from '../services/notification.service.js';

export const triggerPurchaseNotification = async (req, res) => {
    try {
        const { token } = req.body;
        
        if (!token) {
            return res.status(400).json({ error: 'FCM Token is required' });
        }

        // Fire off notification
        await sendPurchaseSuccessNotification(token);
        
        res.status(200).json({ success: true, message: 'Notification triggered' });
    } catch (error) {
        console.error('Trigger Notification Error:', error);
        res.status(500).json({ success: false, message: 'Failed to trigger notification' });
    }
};
