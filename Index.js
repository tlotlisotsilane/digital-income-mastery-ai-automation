const express = require('express');  
const crypto = require('crypto');  
const cors = require('cors');  
require('dotenv').config();  
  
const app = express();  
app.use(express.json());  
app.use(cors());  
  
// Root route - keep your existing page  
app.get('/', (req, res) => {  
  res.send(`  
    <!DOCTYPE html>  
    <html lang="en">  
    <head>  
        <meta charset="UTF-8">  
        <meta name="viewport" content="width=device-width, initial-scale=1.0">  
        <title>Digital Income Mastery - AI Automation</title>  
    </head>  
    <body>  
        <h1>Deployment Successful!</h1>  
        <p>Welcome to Digital Income Mastery: AI & Automation website hosted on Vercel.</p>  
        <p>Webhook endpoint: /webhook/whop</p>  
    </body>  
    </html>  
  `);  
});  
  
// Webhook endpoint for Whop  
app.post('/webhook/whop', (req, res) => {  
  const signature = req.headers['x-whop-signature'];  
  const payload = req.body;  
    
  // Verify webhook signature  
  const isValid = verifyWebhook(signature, payload);  
    
  if (isValid) {  
    console.log('Webhook received:', payload);  
      
    // Handle different event types  
    handleWhopWebhook(payload);  
      
    res.status(200).json({ status: 'success', message: 'Webhook processed' });  
  } else {  
    console.error('Invalid webhook signature');  
    res.status(403).json({ status: 'error', message: 'Invalid signature' });  
  }  
});  
  
// Verify webhook signature  
function verifyWebhook(signature, payload) {  
  if (!process.env.WHOP_WEBHOOK_SECRET) {  
    console.error('Webhook secret not configured');  
    return false;  
  }  
    
  const hmac = crypto.createHmac('sha256', process.env.WHOP_WEBHOOK_SECRET);  
  const digest = hmac.update(JSON.stringify(payload)).digest('hex');  
  return signature === digest;  
}  
  
// Handle different Whop webhook events  
function handleWhopWebhook(event) {  
  switch(event.type) {  
    case 'purchase.created':  
      console.log('New purchase:', event.data);  
      // Handle new course purchase  
      break;  
    case 'membership.started':  
      console.log('Membership started:', event.data);  
      // Handle new subscription  
      break;  
    case 'membership.cancelled':  
      console.log('Membership cancelled:', event.data);  
      // Handle cancellation  
      break;  
    case 'access_revoked':  
      console.log('Access revoked:', event.data);  
      // Handle access revocation  
      break;  
    default:  
      console.log('Unhandled event type:', event.type);  
  }  
}  
  
// Health check endpoint  
app.get('/health', (req, res) => {  
  res.json({ status: 'ok', timestamp: new Date().toISOString() });  
});  
  
const PORT = process.env.PORT || 3000;  
app.listen(PORT, () => {  
  console.log(`Server running on port ${PORT}`);  
  console.log(`Webhook endpoint: http://localhost:${PORT}/webhook/whop`);  
});  
