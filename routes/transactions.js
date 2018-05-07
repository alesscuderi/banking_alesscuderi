const express = require('express');
const router = express.Router();
const Account = require('../models/Account');
const Transaction = require('../models/Transaction');
const auth = require('../middlewares/auth');
const accounts = require('../routes/accounts');



var accountExists = function (req, res, next) {
  Account.findOne({iban: req.body.iban}, function(err, account){
    if (account === null) {
      return res.status(404).json({message: 'Iban not associated'})
    } else {
      req.beneficiary = account  // lo appendo
      next();
    }
  })
}

var enoughMoney = function (req, res, next) {
  if{ (issuer.balance < transaction.amount)
  return res.status(409).json({message: 'Insufficient funds'})
} else {
  next();
}


}

module.exports = accountExists;
module.exports = enoughMoney;
