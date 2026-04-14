import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// ⚠️ Resend FREE TIER RESTRICTION:
// When using onboarding@resend.dev as the sender, Resend only allows delivering
// to the email address that owns the Resend account (your verified email).
// To send to ANY email, you must add & verify a custom domain in Resend dashboard.
// RESEND_VERIFIED_OWNER_EMAIL = your Resend account email (fallback for dev)
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'Nuna Organics <onboarding@resend.dev>';
const RESEND_OWNER_EMAIL = process.env.RESEND_OWNER_EMAIL || 'lakshanganesan05@gmail.com';
const IS_PRODUCTION_DOMAIN = !FROM_EMAIL.includes('onboarding@resend.dev');

// Helper: resolve recipient — in dev (no custom domain), always go to owner email
const resolveRecipient = (requestedEmail) => {
    if (IS_PRODUCTION_DOMAIN) return requestedEmail; // custom domain: send to real user
    // Free tier: redirect all to verified owner, log a warning
    if (requestedEmail !== RESEND_OWNER_EMAIL) {
        console.warn(`[Email] ⚠️  DEV MODE: Resend free tier redirecting email for "${requestedEmail}" → "${RESEND_OWNER_EMAIL}". Add RESEND_FROM_EMAIL with a custom domain to send to real users.`);
    }
    return RESEND_OWNER_EMAIL;
};

/**
 * Sends a beautiful purchase confirmation email to the customer.
 */
export const sendPurchaseConfirmationEmail = async ({ toEmail, orderNumber, items, totalPrice }) => {
    if (!toEmail) return;

    const itemRows = (items || []).map(item => `
        <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; font-family: 'Georgia', serif; font-size: 15px; color: #333;">${item.item_name || item.name}</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; text-align: center; color: #666; font-size: 14px;">${item.quantity || 1}</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; text-align: right; color: #333; font-size: 14px;">$${Number(item.price || 0).toFixed(2)}</td>
        </tr>
    `).join('');

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
                                <h1 style="margin:0; color:#ffffff; font-family:'Georgia',serif; font-size: 28px; letter-spacing: 1px;">NUNA ORGANICS</h1>
                                <p style="margin: 8px 0 0; color: rgba(255,255,255,0.8); font-size: 14px; letter-spacing: 2px; text-transform: uppercase;">Pure. Natural. Botanical.</p>
                            </td>
                        </tr>

                        <!-- Hero Message -->
                        <tr>
                            <td style="padding: 48px 48px 32px; text-align: center;">
                                <div style="font-size: 48px; margin-bottom: 16px;">🌿</div>
                                <h2 style="margin: 0 0 12px; color: #2d5016; font-family: 'Georgia', serif; font-size: 26px;">Thank You for Your Order!</h2>
                                <p style="margin: 0; color: #666; font-size: 16px; line-height: 1.6;">Your botanical remedies are being lovingly prepared and will be on their way to you soon.</p>
                            </td>
                        </tr>

                        <!-- Order Summary -->
                        <tr>
                            <td style="padding: 0 48px 32px;">
                                <div style="background: #f8f5f0; border-radius: 12px; padding: 24px;">
                                    <p style="margin: 0 0 16px; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; color: #999;">Order Confirmation</p>
                                    <p style="margin: 0 0 20px; font-size: 22px; font-weight: bold; color: #2d5016; font-family: 'Georgia', serif;">#${orderNumber}</p>
                                    
                                    <table width="100%" cellpadding="0" cellspacing="0">
                                        <tr>
                                            <th style="text-align: left; padding-bottom: 12px; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #999; border-bottom: 2px solid #e8e0d0;">Product</th>
                                            <th style="text-align: center; padding-bottom: 12px; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #999; border-bottom: 2px solid #e8e0d0;">Qty</th>
                                            <th style="text-align: right; padding-bottom: 12px; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #999; border-bottom: 2px solid #e8e0d0;">Price</th>
                                        </tr>
                                        ${itemRows}
                                    </table>

                                    <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 16px;">
                                        <tr>
                                            <td style="font-size: 16px; font-weight: bold; color: #2d5016; font-family: 'Georgia', serif;">Total</td>
                                            <td style="text-align: right; font-size: 20px; font-weight: bold; color: #2d5016; font-family: 'Georgia', serif;">$${Number(totalPrice || 0).toFixed(2)}</td>
                                        </tr>
                                    </table>
                                </div>
                            </td>
                        </tr>

                        <!-- CTA -->
                        <tr>
                            <td style="padding: 0 48px 48px; text-align: center;">
                                <a href="${process.env.FRONTEND_URL || 'https://nuna-natural-haven.vercel.app'}/dashboard" style="display: inline-block; background: linear-gradient(135deg, #2d5016, #4a7c26); color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 50px; font-size: 15px; font-weight: bold; letter-spacing: 0.5px;">Track Your Order →</a>
                            </td>
                        </tr>

                        <!-- Footer -->
                        <tr>
                            <td style="background: #2d5016; padding: 24px 48px; text-align: center;">
                                <p style="margin: 0; color: rgba(255,255,255,0.7); font-size: 13px;">Questions? Reply to this email or visit our <a href="${process.env.FRONTEND_URL || 'https://nuna-natural-haven.vercel.app'}/contact" style="color: #a8d5a2;">Contact Page</a></p>
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
        const { data, error } = await resend.emails.send({
            from: FROM_EMAIL,
            to: [resolveRecipient(toEmail)],
            subject: `🌿 Your Nuna Organics Order #${orderNumber} is confirmed!`,
            html
        });
        if (error) console.error('[Email] Purchase confirmation send error:', error);
        else console.log(`[Email] Purchase confirmation sent to ${toEmail}:`, data?.id);
    } catch (err) {
        console.error('[Email] Failed to send purchase confirmation:', err);
    }
};

/**
 * Sends an abandoned cart reminder email with a compelling CTA.
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
                                <h1 style="margin:0; color:#ffffff; font-family:'Georgia',serif; font-size: 28px; letter-spacing: 1px;">NUNA ORGANICS</h1>
                                <p style="margin: 8px 0 0; color: rgba(255,255,255,0.8); font-size: 14px; letter-spacing: 2px; text-transform: uppercase;">Pure. Natural. Botanical.</p>
                            </td>
                        </tr>

                        <!-- Cart Reminder -->
                        <tr>
                            <td style="padding: 48px 48px 32px; text-align: center;">
                                <div style="font-size: 56px; margin-bottom: 16px;">🛒</div>
                                <h2 style="margin: 0 0 12px; color: #2d5016; font-family: 'Georgia', serif; font-size: 26px;">You left something behind!</h2>
                                <p style="margin: 0; color: #666; font-size: 16px; line-height: 1.6;">
                                    Your <strong style="color: #2d5016;">${productName || 'natural botanical product'}</strong> is still waiting for you in your cart. 
                                    Nature's best doesn't wait forever!
                                </p>
                            </td>
                        </tr>

                        <!-- Special Offer Banner -->
                        <tr>
                            <td style="padding: 0 48px 32px;">
                                <div style="background: linear-gradient(135deg, #fff8e7, #ffefc0); border: 2px dashed #f5c842; border-radius: 12px; padding: 24px; text-align: center;">
                                    <p style="margin: 0 0 8px; font-size: 13px; text-transform: uppercase; letter-spacing: 2px; color: #b8860b;">Limited Time Offer</p>
                                    <p style="margin: 0; font-size: 32px; font-weight: bold; color: #2d5016; font-family:'Georgia',serif;">10% OFF</p>
                                    <p style="margin: 8px 0 0; font-size: 14px; color: #666;">Use code <strong>COMEBACK10</strong> at checkout!</p>
                                </div>
                            </td>
                        </tr>

                        <!-- CTA Button -->
                        <tr>
                            <td style="padding: 0 48px 48px; text-align: center;">
                                <a href="${shopUrl}" style="display: inline-block; background: linear-gradient(135deg, #2d5016, #4a7c26); color: #ffffff; text-decoration: none; padding: 16px 40px; border-radius: 50px; font-size: 16px; font-weight: bold; letter-spacing: 0.5px;">Complete My Purchase →</a>
                                <p style="margin: 16px 0 0; color: #999; font-size: 13px;">This offer expires in 24 hours.</p>
                            </td>
                        </tr>

                        <!-- Footer -->
                        <tr>
                            <td style="background: #2d5016; padding: 24px 48px; text-align: center;">
                                <p style="margin: 0; color: rgba(255,255,255,0.7); font-size: 13px;">Don't want these reminders? <a href="#" style="color: #a8d5a2;">Unsubscribe</a></p>
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
        const { data, error } = await resend.emails.send({
            from: FROM_EMAIL,
            to: [resolveRecipient(toEmail)],
            subject: `🛒 Hey! Your ${productName || 'item'} is still waiting — 10% OFF inside`,
            html
        });
        if (error) console.error('[Email] Abandoned cart send error:', error);
        else console.log(`[Email] Abandoned cart email sent to ${toEmail}:`, data?.id);
    } catch (err) {
        console.error('[Email] Failed to send abandoned cart email:', err);
    }
};
