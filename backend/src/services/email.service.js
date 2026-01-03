import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendOrderConfirmationEmail = async (email, orderDetails) => {
    try {
        const { items, total, orderNumber } = orderDetails;

        const itemsHtml = items.map(item => `
            <div style="margin-bottom: 10px; border-bottom: 1px solid #eee; padding-bottom: 10px;">
                <strong>${item.name}</strong> x ${item.quantity}<br>
                Price: ₹${item.price}
            </div>
        `).join('');

        const { data, error } = await resend.emails.send({
            from: "Renu's Natural Haven <orders@renunatural.com>",
            to: [email],
            subject: `Order Confirmation - #${orderNumber}`,
            html: `
                <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e1e1e1; border-radius: 10px; color: #333;">
                    <div style="text-align: center; margin-bottom: 30px;">
                        <h1 style="color: #2D5A27; margin: 0;">🌿 Renu's Natural Haven</h1>
                        <p style="color: #666; font-size: 14px;">Pure Botanical Remedies</p>
                    </div>
                    
                    <h2 style="color: #333;">Thank you for your order!</h2>
                    <p>We are preparing your botanical goodies. Here is your order summary for <strong>#${orderNumber}</strong>:</p>
                    
                    <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        ${itemsHtml}
                        <div style="margin-top: 15px; font-size: 18px;">
                            <strong>Order Total: ₹${total}</strong>
                        </div>
                    </div>
                    
                    <p>Your order will be shipped within 2-3 business days. You will receive another email with tracking details once it's on the way.</p>
                    
                    <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0;">
                    
                    <div style="text-align: center; font-size: 12px; color: #999;">
                        <p>© 2026 Renu's Natural Haven. All rights reserved.</p>
                        <p>Need help? Contact us at support@renunatural.com</p>
                    </div>
                </div>
            `,
        });

        if (error) {
            console.error('❌ Email sending failed:', error);
            return { success: false, error };
        }

        console.log('✅ Order confirmation email sent to:', email);
        return { success: true, data };
    } catch (err) {
        console.error('❌ Error in email service:', err);
        return { success: false, error: err.message };
    }
};
