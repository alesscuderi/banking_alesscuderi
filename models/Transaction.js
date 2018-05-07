const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
  issuer: {type: Schema.Types.ObjectId, ref:'Account', required: true},
  beneficiary: {type: Schema.Types.ObjectId, ref:'Account', required: true},
  amount: {type: Number, required: true},
  description: {type: String, required: true}
});

module.exports = mongoose.model('Transaction', TransactionSchema);
