import { sendPurchaseSuccessNotification } from '../services/notification.service.js';
import { sendPurchaseConfirmationEmail } from '../services/email.service.js';

export const triggerPurchaseNotification = async (req, res) => {
    try {
        const { token, email, orderNumber, items, totalPrice } = req.body;

        // 1. Send FCM push notification (if user opted in)
        if (token) {
            sendPurchaseSuccessNotification(token).catch(err =>
                console.warn('[Notification] FCM push failed (non-fatal):', err.message)
            );
        }

        // 2. Send purchase confirmation email (if email is available)
        if (email) {
            sendPurchaseConfirmationEmail({
                toEmail: email,
                orderNumber: orderNumber || `RN-${Math.floor(Math.random() * 90000) + 10000}`,
                items: items || [],
                totalPrice: totalPrice || 0
            }).catch(err =>
                console.warn('[Notification] Purchase email failed (non-fatal):', err.message)
            );
        }

        res.status(200).json({ success: true, message: 'Notifications triggered' });
    } catch (error) {
        console.error('Trigger Notification Error:', error);
        res.status(500).json({ success: false, message: 'Failed to trigger notification' });
    }
};
