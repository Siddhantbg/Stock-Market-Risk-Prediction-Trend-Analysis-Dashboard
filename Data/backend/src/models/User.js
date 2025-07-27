const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String },
  preferredCurrency: { type: String, default: 'USD' },
  age:{type: Number},
  dob: {type: Date},
  address: {type: String},
  status: {type: String},
  mobile:{type: String},
  metamaskId: {type: String, default:""},
  upiId: {type: String, default:""},
  kyc: {type: Boolean, default:false}
},{
  timestamps: true
});

module.exports = mongoose.model('User', UserSchema);
