import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  full_name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  phone: { type: String, default: '' },
  country: { type: String, default: '' },
  province: { type: String, default: '' },
  city: { type: String, default: '' },
  cnic: { type: String, default: '' },
  trading_experience: { type: String, default: '' },
  profession: { type: String, default: '' },
  is_paid: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.models.User || mongoose.model('User', userSchema)
