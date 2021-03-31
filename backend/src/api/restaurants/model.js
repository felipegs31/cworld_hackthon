import mongoose, { Schema } from 'mongoose'
import mongooseKeywords from "mongoose-keywords";
import round from '../../services/utils/round';

const restaurantsSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  photoUrl: {
    type: String,
  },
  averageRate: {
    type: Number,
    default: 0
  },
  rates: {
    quantityOne: {
      type: Number,
      default: 0
    },
    quantityTwo: {
      type: Number,
      default: 0
    },
    quantityThree: {
      type: Number,
      default: 0
    },
    quantityFour: {
      type: Number,
      default: 0
    },
    quantityFive: {
      type: Number,
      default: 0
    }
  },
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

restaurantsSchema.plugin(mongooseKeywords, {
  paths: ["name", "category"]
});

restaurantsSchema.pre('save', function (next) {
  if (!this.isModified('rates')) return next()
  let sumOfElements = 0
  let sumOfStars = 0
  Object.keys(this.rates).map((key, index) => {
    if (index > 0) {
      sumOfElements += this.rates[key]
      sumOfStars += this.rates[key] * index
    }
  });
  const average = sumOfElements === 0 ? 0 : round(sumOfStars/sumOfElements, 2)
  this.averageRate = average
  next()
})

restaurantsSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      averageRate: this.averageRate,
      photoUrl: this.photoUrl,
      rates: this.rates,
      category: this.category,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Restaurants', restaurantsSchema)

export const schema = model.schema
export default model
