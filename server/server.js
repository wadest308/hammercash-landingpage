
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

app.get('/', (req, res) => {
  res.send('HammerCash Stripe API server is running.');
});

app.post('/api/stripe/connect', async (req, res) => {
  try {
    const account = await stripe.accounts.create({
      type: 'standard',
    });

    const accountLink = await stripe.accountLinks.create({
      account: account.id,
      refresh_url: 'http://localhost:3000/reauth',
      return_url: 'http://localhost:5173/dashboard/account?stripe_return=true',
      type: 'account_onboarding',
    });

    res.json({ url: accountLink.url });
  } catch (error) {
    console.error('Error creating Stripe Connect account:', error);
    res.status(500).json({ error: 'Failed to create Stripe Connect account' });
  }
});

app.post('/api/stripe/create-payment-intent', async (req, res) => {
  try {
    const { amount, currency, destination } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      application_fee_amount: Math.round(amount * 0.03),
      transfer_data: {
        destination,
      },
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error creating Payment Intent:', error);
    res.status(500).json({ error: 'Failed to create Payment Intent' });
  }
});

app.post('/api/stripe/release-payment', async (req, res) => {
  try {
    const { paymentIntentId, amount } = req.body;

    const transfer = await stripe.transfers.create({
      amount,
      currency: 'usd',
      destination: 'acct_1PXYZxK1H3j9Zx', // placeholder
      transfer_group: paymentIntentId,
    });

    res.json({ success: true, transfer });
  } catch (error) {
    console.error('Error releasing payment:', error);
    res.status(500).json({ error: 'Failed to release payment' });
  }
});

app.post('/api/stripe/webhook', (req, res) => {
  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err) {
    console.error(`Webhook Error: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log('PaymentIntent was successful!', paymentIntent);
      // Add your business logic here
      break;
    case 'account.updated':
        const account = event.data.object;
        console.log('Account was updated!', account);
        // Add your business logic here
        break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
