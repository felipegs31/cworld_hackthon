import mongoose, { Schema } from 'mongoose'
import mongooseKeywords from "mongoose-keywords";
import round from '../../services/utils/round';

const campaignsSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  budget: {
    type: Number,
    required: true
  },
  spendedBudget: {
    type: Number,
    default: 0
  },
  photoUrl: {
    type: String
  },
  startDate: {
    type: Date
  },
  endDate: {
    type: Date
  },
  queryText: String,
  ageRange: {
    type: [Number]
  },
  filterTags: {
    type: [String]
  },
  goals: {
    type: String
  },
  deleted: {
    type: Boolean,
    default: false
  },
  positivity: Number,
  createdBy: { type: Schema.Types.ObjectId, ref: 'Users' }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

campaignsSchema.plugin(mongooseKeywords, {
  paths: ["name", "filterTags"]
});

campaignsSchema.pre('save', function (next) {
  if (!this.isModified('rates')) return next()
  let sumOfElements = 0
  let sumOfStars = 0
  Object.keys(this.rates).map((key, index) => {
    if (index > 0) {
      sumOfElements += this.rates[key]
      sumOfStars += this.rates[key] * index
    }
  });
  const average = sumOfElements === 0 ? 0 : round(sumOfStars / sumOfElements, 2)
  this.averageRate = average
  next()
})

campaignsSchema.methods = {
  view(full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      photoUrl: this.photoUrl,
      budget: this.budget,
      startDate: this.startDate,
      endDate: this.endDate,
      ageRange: this.ageRange,
      filterTags: this.filterTags,
      goals: this.goals,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      createdBy: this.createdBy,
      queryText: this.queryText,
      positivity: this.positivity
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Campaigns', campaignsSchema)

export const schema = model.schema
export default model
