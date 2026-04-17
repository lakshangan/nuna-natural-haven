import dotenv from 'dotenv';
import { sendPurchaseConfirmationEmail } from './src/services/email.service.js';

dotenv.config();

const testEmail = async () => {
    const targetEmail = process.argv[2] || process.env.GMAIL_USER;
    
    console.log(`🚀 Starting Gmail SMTP Test...`);
    console.log(`📡 Sending to: ${targetEmail}`);
    console.log(`📧 Using Gmail: ${process.env.GMAIL_USER}`);
    
    try {
        await sendPurchaseConfirmationEmail({
            toEmail: targetEmail,
            orderNumber: 'TEST-SMTP-001',
            items: [{ name: 'Nuna Organic Lavender Blend', price: 299, quantity: 1 }],
            totalPrice: 299
        });
        console.log('✅ Email service call finished. Check your inbox!');
    } catch (err) {
        console.error('❌ Critical Test Failure:', err);
    }
};

testEmail();
