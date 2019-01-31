const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema

// 具有安全性的schema
const UserSchema = new mongoose.Schema({
  role: {
    type: String,
    default: 'user'
  },
  username: String,
  email: String,
  password: String,
  hashed_password: String,
  loginAttempts: {
    type: Number,
    required: true,
    default: 0
  },
  lockUntil: Number,
  meta: {
    createdAt: {
      type: Date,
      default: Date.now()
    },
    updatedAt: {
      type: Date,
      default: Date.now()
    }
  }
})

// 是否被锁
UserSchema.virtual('isLocked').get(() => {
  return !!(this.lockUntil && this.lockUntil > Date.now())
})

UserSchema.pre('save', next => {
  if (this.isNew) this.meta.createdAt = this.meta.updatedAt = Date.now()
  this.meta.updatedAt = Date.now()

  next()
})

UserSchema.pre('save', next => {

})


mongoose.model('User', UserSchema)
