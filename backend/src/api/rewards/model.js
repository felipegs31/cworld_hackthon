import mongoose, { Schema } from 'mongoose'

const rewardsSchema = new Schema({
  influencerTwitterId: {
    type: String,
    required: true
  },
  key: {
    type: String,
    unique: true
  },
  campaign: {
    type: Schema.Types.ObjectId,
    ref: 'Campaigns'
  },
  positivity: Number,
  tweetId: String,
  claimed: {
    type: Boolean,
    default: false
  },
  value: Number,
  deleted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})


rewardsSchema.methods = {
  view(full) {
    const view = {
      // simple view
      id: this.id,
      influencerTwitterId: this.influencerTwitterId,
      key: this.key,
      campaign: this.campaign,
      positivity: this.positivity,
      tweetId: this.tweetId,
      claimed: this.claimed
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Rewards', rewardsSchema)

export const schema = model.schema
export default model
