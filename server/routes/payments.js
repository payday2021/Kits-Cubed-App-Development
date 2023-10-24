const express = require('express');
const router = express.Router();
const stripe = require('stripe')('sk_test_51O4bLxJ3pYnN1kTgyEltp0Bt3kzgrcpQ35I2aKxK8BNlBZmT6Yk7fDDC4ViscVJEeRyQBpYHpuxmc1q7ma3DC5jB00rtWAmNY7')

router.post('/intent', async (req, res) => {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: 'usd',
        automatic_payment_methods: {
          enabled: true,
        },
      });
  
      res.json({ paymentIntent: paymentIntent.client_secret });
    } catch (e) {
      res.status(400).json({
        error: e.message,
      });
    }
  });

module.exports = router;