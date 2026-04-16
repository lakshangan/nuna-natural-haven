import dotenv from 'dotenv';
import { sendPurchaseConfirmationEmail } from './src/services/email.service.js';

dotenv.config();

const testEmail = async () => {
    const targetEmail = process.argv[2] || process.env.GMAIL_USER;
    
    console.log(`🚀 Starting Email Test...`);
    console.log(`📡 Target Email: ${targetEmail}`);
    console.log(`🔑 Resend Key present: ${!!process.env.RESEND_API_KEY}`);
    console.log(`📧 Gmail User: ${process.env.GMAIL_USER}`);
    
    try {
        await sendPurchaseConfirmationEmail({
            toEmail: targetEmail,
            orderNumber: 'TEST-0001',
            items: [{ name: 'Test Lavender Product', price: 299, quantity: 1 }],
            totalPrice: 299
        });
        console.log('✅ Test function execution finished. Check the logs above for success/failure.');
    } catch (err) {
        console.error('❌ Critical Test Failure:', err);
    }
};

testEmail();
