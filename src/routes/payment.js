const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

var express = require("express");
var router = express.Router();

router.post("/pay", (req, res) => {
  if (!req.user) {
    res.sendStatus(403);
  }
  return stripe.charges
    .create({
      amount: req.body.amount, // Unit: cents
      currency: "eur",
      source: req.body.tokenId,
      description: "Test payment",
    })
    .then((result) => res.status(200).json(result));
});

module.exports = router;
