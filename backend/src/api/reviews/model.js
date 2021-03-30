import mongoose, { Schema } from 'mongoose'

const reviewsSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  restaurant: {
    type: Schema.ObjectId,
    ref: 'Restaurants',
    required: true
  },
  rate: {
    type: Number,
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  visitDate: {
    type: Date,
    required: true
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

reviewsSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      user: this.user.view(),
      restaurant: this.restaurant,
      rate: this.rate,
      comment: this.comment,
      visitDate: this.visitDate,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Reviews', reviewsSchema)

export const schema = model.schema
export default model
