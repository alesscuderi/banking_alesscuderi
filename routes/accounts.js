const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jwt-simple');
const Account = require('../models/Account');
const Transaction = require('../models/Transaction');
const auth = require('../middlewares/auth');
const transactions = require('../routes/transactions');


router.post('/signup', function(req, res) {
    var account = new Account();
    account.number = number.randomNumber();
    account.name = req.body.name;
    account.surname = req.body.surname;
    account.password = bcrypt.hashSync(req.body.password, 10);
    account.email = req.body.email;
    account.iban = iban.randomNumber();
    account.save(function(err, userCreated) {
        if (err) return res.status(400).json(err);
        res.status(201).json(userCreated);
    })
})

router.post('/login', function(req, res) {
    account.findOne({accountNumber: req.body.number}, function(err, account){
        if (account === null) {
            return res.status(404).json({message: 'Account not found'})
        } else if (bcrypt.compareSync(req.body.password, account.password)) {
            var token = jwt.encode(account.number, auth.secret);
            return res.json({token: token});
        } else {
            return res.status(401).json({message: 'password not valid'});
        }

    })

})

router.get('/me', auth.verify, function(req, res, next) {
    res.json(req.account);
});

// this api should create a transaction
router.post('/transaction', auth.verify, transactions.accountExists, transactions.enoughMoney, function (req, res) {
  var transaction = new Transaction();
  transaction.issuer = req.issuer._id;
  transaction.beneficiary = req.beneficiary._id;
  transaction.amount = req.body.amount;
  transaction.description = req.body.description;

  req.issuer.balance = req.issuer.balance - req.transaction.amount;
  req.beneficiary.balance = req.beneficiary.balance + req.transaction.amount;

  req.issuer.save()
  req.beneficiary.save()

  transaction.save(function (err, transaction_done) {
    if (err) return res.status(500).json(err);
    return res.status(201).json(transaction_done)
  })

})

module.exports = router;
