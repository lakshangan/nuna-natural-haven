import admin from 'firebase-admin';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

async function run() {
  try {
    const response = await admin.messaging().send({
      notification: { title: 'Test', body: 'Test' },
      token: 'cN_cWmfoW39WPFhDSVzTpY:APA91bE5DJfpy2t7JvkKOuHNc0K77bJHq-QIe-Rr-1WzT0DVC5-Cm5KdoRtff4s38Sx9o2RfRxE3BeopnJ7ZtqlHJW0VRZEUDCTid2fNaRCxGvv1VE_IH_w'
    });
    console.log('Success:', response);
  } catch (err) {
    console.log('Error:', err);
  }
}
run();
