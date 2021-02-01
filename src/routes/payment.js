const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

var express = require("express");
var router = express.Router();

router.post("/pay", async (req, res) => {
  if (!req.user) {
    res.sendStatus(403);
  } else {
    const result = await stripe.charges.create({
      amount: req.body.amount, // Unit: cents
      currency: "eur",
      source: req.body.tokenId,
      description: "Test payment",
    });
    res.send(result);
  }
});

module.exports = router;
