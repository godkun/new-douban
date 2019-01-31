const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Mixed = Schema.Types.Mixed
// 不具有任何安全性的 schema
const MovieSchema = new mongoose.Schema({
  doubanId: String,
  rate: Number,
  title: String,
  summary: String,
  video: String,
  cover: String,
  poster: String,
  videoKey: String,
  coverKey: String,
  posterKey: String,
  rawTitle: String,
  movieTypes: [String],
  pubdate: Mixed,
  tags: Mixed,
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

MovieSchema.pre('save', next => {
  if (this.isNew) this.meta.createdAt = this.meta.updatedAt = Date.now()
  this.meta.updatedAt = Date.now()
})


mongoose.model('Movie', MovieSchema)
