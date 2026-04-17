import nodemailer from 'nodemailer';

// Gmail SMTP transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
    }
});

const FROM_NAME = 'Nuna Organics 🌿';
const getFrom = () => `"${FROM_NAME}" <${process.env.GMAIL_USER}>`;

/**
 * Sends a beautiful purchase confirmation email to the customer.
 */
export const sendPurchaseConfirmationEmail = async ({ toEmail, orderNumber, items, totalPrice }) => {
    if (!toEmail) return;

    // Use ₹ instead of $ for Indian market
    const currencySymbol = '₹';

    const itemRows = (items || []).map(item => `
        <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; font-family: Georgia, serif; font-size: 15px; color: #333;">${item.item_name || item.name}</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; text-align: center; color: #666; font-size: 14px;">${item.quantity || 1}</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; text-align: right; color: #333; font-size: 14px;">${currencySymbol}${Number(item.price || 0).toFixed(2)}</td>
        </tr>
    `).join('');

    const frontendUrl = process.env.FRONTEND_URL || 'https://nuna-natural-haven.vercel.app';

    const html = `
    <!DOCTYPE html>
    <html>
    <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
    <body style="margin:0; padding:0; background-color:#f8f5f0; font-family: Arial, sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8f5f0; padding: 40px 20px;">
            <tr>
                <td align="center">
                    <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08);">

                        <!-- Header -->
                        <tr>
                            <td style="background: linear-gradient(135deg, #2d5016 0%, #4a7c26 100%); padding: 40px 48px; text-align: center;">
                                <h1 style="margin:0; color:#ffffff; font-family:Georgia,serif; font-size: 28px; letter-spacing: 1px;">NUNA ORGANICS</h1>
                                <p style="margin: 8px 0 0; color: rgba(255,255,255,0.8); font-size: 14px; letter-spacing: 2px; text-transform: uppercase;">Pure. Natural. Botanical.</p>
                            </td>
                        </tr>

                        <!-- Hero Message -->
                        <tr>
                            <td style="padding: 48px 48px 32px; text-align: center;">
                                <div style="font-size: 48px; margin-bottom: 16px;">🌿</div>
                                <h2 style="margin: 0 0 12px; color: #2d5016; font-family: Georgia, serif; font-size: 26px;">Thank You for Your Order!</h2>
                                <p style="margin: 0; color: #666; font-size: 16px; line-height: 1.6;">Your botanical remedies are being lovingly prepared and will be on their way to you soon.</p>
                            </td>
                        </tr>

                        <!-- Order Summary -->
                        <tr>
                            <td style="padding: 0 48px 32px;">
                                <div style="background: #f8f5f0; border-radius: 12px; padding: 24px;">
                                    <p style="margin: 0 0 8px; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; color: #999;">Order Confirmation</p>
                                    <p style="margin: 0 0 20px; font-size: 22px; font-weight: bold; color: #2d5016; font-family: Georgia, serif;">#${orderNumber}</p>
                                    <table width="100%" cellpadding="0" cellspacing="0">
                                        <tr>
                                            <th style="text-align: left; padding-bottom: 12px; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #999; border-bottom: 2px solid #e8e0d0;">Product</th>
                                            <th style="text-align: center; padding-bottom: 12px; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #999; border-bottom: 2px solid #e8e0d0;">Qty</th>
                                            <th style="text-align: right; padding-bottom: 12px; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #999; border-bottom: 2px solid #e8e0d0;">Price</th>
                                        </tr>
                                        ${itemRows || '<tr><td colspan="3" style="padding: 12px 0; color: #999; font-size: 14px;">No items</td></tr>'}
                                    </table>
                                    <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 16px; border-top: 2px solid #e8e0d0; padding-top: 12px;">
                                        <tr>
                                            <td style="font-size: 16px; font-weight: bold; color: #2d5016; font-family: Georgia, serif;">Total</td>
                                            <td style="text-align: right; font-size: 20px; font-weight: bold; color: #2d5016; font-family: Georgia, serif;">${currencySymbol}${Number(totalPrice || 0).toFixed(2)}</td>
                                        </tr>
                                    </table>
                                </div>
                            </td>
                        </tr>

                        <!-- CTA -->
                        <tr>
                            <td style="padding: 0 48px 48px; text-align: center;">
                                <a href="${frontendUrl}/dashboard" style="display: inline-block; background: linear-gradient(135deg, #2d5016, #4a7c26); color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 50px; font-size: 15px; font-weight: bold; letter-spacing: 0.5px;">View My Orders →</a>
                            </td>
                        </tr>

                        <!-- Footer -->
                        <tr>
                            <td style="background: #2d5016; padding: 24px 48px; text-align: center;">
                                <p style="margin: 0; color: rgba(255,255,255,0.7); font-size: 13px;">Questions? Visit our <a href="${frontendUrl}/contact" style="color: #a8d5a2;">Contact Page</a></p>
                                <p style="margin: 8px 0 0; color: rgba(255,255,255,0.4); font-size: 11px;">© 2025 Nuna Organics. All rights reserved.</p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>`;

    try {
        console.log(`[Email] Attempting to send via Gmail to: ${toEmail}`);
        const info = await transporter.sendMail({
            from: getFrom(),
            to: toEmail,
            subject: `🌿 Your Nuna Organics Order #${orderNumber} is confirmed!`,
            html
        });
        console.log(`[Email] ✅ Purchase confirmation sent via Gmail: ${info.messageId}`);
    } catch (err) {
        console.error('[Email] ❌ Failed to send purchase confirmation:', err.message);
    }
};

/**
 * Sends an abandoned cart reminder email with a 10% OFF coupon.
 */
export const sendAbandonedCartEmail = async ({ toEmail, productName }) => {
    if (!toEmail) return;

    const shopUrl = `${process.env.FRONTEND_URL || 'https://nuna-natural-haven.vercel.app'}/shop`;

    const html = `
    <!DOCTYPE html>
    <html>
    <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
    <body style="margin:0; padding:0; background-color:#f8f5f0; font-family: Arial, sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8f5f0; padding: 40px 20px;">
            <tr>
                <td align="center">
                    <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08);">

                        <!-- Header -->
                        <tr>
                            <td style="background: linear-gradient(135deg, #2d5016 0%, #4a7c26 100%); padding: 40px 48px; text-align: center;">
                                <h1 style="margin:0; color:#ffffff; font-family:Georgia,serif; font-size: 28px; letter-spacing: 1px;">NUNA ORGANICS</h1>
                                <p style="margin: 8px 0 0; color: rgba(255,255,255,0.8); font-size: 14px; letter-spacing: 2px; text-transform: uppercase;">Pure. Natural. Botanical.</p>
                            </td>
                        </tr>

                        <!-- Reminder -->
                        <tr>
                            <td style="padding: 48px 48px 32px; text-align: center;">
                                <div style="font-size: 56px; margin-bottom: 16px;">🛒</div>
                                <h2 style="margin: 0 0 12px; color: #2d5016; font-family: Georgia, serif; font-size: 26px;">You left something behind!</h2>
                                <p style="margin: 0; color: #666; font-size: 16px; line-height: 1.6;">
                                    Your <strong style="color: #2d5016;">${productName || 'natural botanical product'}</strong> is still waiting for you.
                                    Nature's best doesn't wait forever!
                                </p>
                            </td>
                        </tr>

                        <!-- Offer -->
                        <tr>
                            <td style="padding: 0 48px 32px;">
                                <div style="background: linear-gradient(135deg, #fff8e7, #ffefc0); border: 2px dashed #f5c842; border-radius: 12px; padding: 24px; text-align: center;">
                                    <p style="margin: 0 0 8px; font-size: 13px; text-transform: uppercase; letter-spacing: 2px; color: #b8860b;">Limited Time Offer</p>
                                    <p style="margin: 0; font-size: 36px; font-weight: bold; color: #2d5016; font-family:Georgia,serif;">10% OFF</p>
                                    <p style="margin: 8px 0 0; font-size: 15px; color: #666;">Use code <strong style="color: #2d5016; font-size: 18px;">COMEBACK10</strong> at checkout</p>
                                </div>
                            </td>
                        </tr>

                        <!-- CTA -->
                        <tr>
                            <td style="padding: 0 48px 48px; text-align: center;">
                                <a href="${shopUrl}" style="display: inline-block; background: linear-gradient(135deg, #2d5016, #4a7c26); color: #ffffff; text-decoration: none; padding: 16px 40px; border-radius: 50px; font-size: 16px; font-weight: bold; letter-spacing: 0.5px;">Complete My Purchase →</a>
                                <p style="margin: 16px 0 0; color: #999; font-size: 13px;">This offer expires in 24 hours.</p>
                            </td>
                        </tr>

                        <!-- Footer -->
                        <tr>
                            <td style="background: #2d5016; padding: 24px 48px; text-align: center;">
                                <p style="margin: 0; color: rgba(255,255,255,0.4); font-size: 11px;">© 2025 Nuna Organics. All rights reserved.</p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>`;

    try {
        console.log(`[Email] Sending abandoned cart via Gmail to: ${toEmail}`);
        const info = await transporter.sendMail({
            from: getFrom(),
            to: toEmail,
            subject: `🛒 Hey! Your ${productName || 'item'} is still waiting — 10% OFF inside`,
            html
        });
        console.log(`[Email] ✅ Abandoned cart email sent via Gmail: ${info.messageId}`);
    } catch (err) {
        console.error('[Email] ❌ Failed to send abandoned cart email:', err.message);
    }
};

