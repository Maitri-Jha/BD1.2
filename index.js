const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3010;
let cors = require('cors');
app.use(cors());

app.use(express.static('static'));

let taxRate = 5;
let discountPercentage = 10;
let loyaltyRate = 2;

app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);

  let total = newItemPrice + cartTotal;

  res.send(total.toString());
});

app.get('/membership-discount', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember;

  if ((isMember = 'true')) {
    cartTotal = cartTotal - (cartTotal * discountPercentage) / 100;
  }

  res.send(cartTotal.toString());
});

app.get('/calculate-tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  cartTotal = (cartTotal * taxRate) / 100;

  res.send(cartTotal.toString());
});

app.get('/estimate-delivery', (req, res) => {
  let shippingMethod = req.query.shippingMethod;
  let distance = parseFloat(req.query.distance);
  let day = distance;

  if (shippingMethod == 'standard') {
    day = distance / 50;
  }

  if (shippingMethod == 'express') {
    day = distance / 100;
    // res.send(distance.toString());
  }

  res.send(day.toString());
  // res.send(shippingMethod);
});

app.get('/shipping-cost', (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);
  let cost = (weight * distance) / 10;

  res.send(cost.toString());
});

app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  let points = purchaseAmount * loyaltyRate;

  res.send(points.toString());
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
