const express = require("express");
require("dotenv").config();
require("./config");
var firebase = require("firebase/app");

const app = express();

app.use(express.json());

const stripe = require("stripe")(process.env.secret_key);

app.post("/checkout", async (req, res) => {
  // Use an existing Customer ID if this is a returning customer.
  const customer = await stripe.customers.create();
  const ephemeralKey = await stripe.ephemeralKeys.create(
    { customer: customer.id },
    { apiVersion: "2020-08-27" }
  );
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1099,
    currency: "usd",
    customer: customer.id,
  });
  res.json({
    paymentIntent: paymentIntent.client_secret,
    ephemeralKey: ephemeralKey.secret,
    customer: customer.id,
  });
});

app.post("/signup", (req, res) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(req.body.email, req.body.password)
    .then((userCredential) => {
      // Signed in
      // var user = userCredential.user;
      // ...

      firebase.database().ref('users/' + userCredential.user.uid).set({
        name: req.body.name,
        email: req.body.email,
      });


      res.json(userCredential);
    })
    .catch((error) => {
      // var errorCode = error.code;
      // var errorMessage = error.message;
      // ..
      res.send(error);
    });
});

app.post("/login", (req, res) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(req.body.email, req.body.password)
    .then((userCredential) => {
      // Signed in
      // var user = userCredential.user;
      // ...
      res.json(userCredential);
    })
    .catch((error) => {
      // var errorCode = error.code;
      // var errorMessage = error.message;

      res.send(error);
    });
});

const port = process.env.PORT || 4242;
app.listen(port, () => console.log(`Node server listening on port ${4242}!`));
