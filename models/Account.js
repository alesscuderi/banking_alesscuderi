const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AccountSchema = new Schema({
  number: {type: String, required: true}
  name: {type: String, required: true},
  surname: {type: String, required: true},
  email: {type: String, unique: true, required: true},
  password: {type: String, required: true},
  iban: {type: String, unique: true, required: true}
  balance: {type: Number, required: true}
});

module.exports = mongoose.model('Account', AccountSchema);
