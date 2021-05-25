const express = require('express');
require('dotenv').config()
const app = express();
app.use(express.json());

const stripe = require('stripe')(process.env.secret_key);

app.post('/checkout', async (req, res) => {
  // Use an existing Customer ID if this is a returning customer.
  const customer = await stripe.customers.create();
  const ephemeralKey = await stripe.ephemeralKeys.create(
    {customer: customer.id},
    {apiVersion: '2020-08-27'},
  );
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1099,
    currency: 'usd',
    customer: customer.id,
  });
  res.json({
    paymentIntent: paymentIntent.client_secret,
    ephemeralKey: ephemeralKey.secret,
    customer: customer.id,
  });
});

const port = process.env.PORT || 4242;
app.listen(port, () => console.log(`Node server listening on port ${4242}!`));
