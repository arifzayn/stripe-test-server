const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const stripe = require('stripe')(
  'sk_test_51IsoKoC4yLgdhwCefALIiyedM60Bc9znfSEpDFxUM2dgMmnSZmfMWbMuiyGgunOfmRNBlyjbrJSqClA8Smt4c1lH00xnVaSBLV',
);

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

app.listen(4242, () => console.log(`Node server listening on port ${4242}!`));
