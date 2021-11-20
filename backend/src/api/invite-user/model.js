import mongoose, { Schema } from 'mongoose'
import { uid } from 'rand-token'

const inviteUserSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  token: {
    type: String,
    unique: true,
    index: true,
    default: () => uid(32)
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 86400
  }
})

inviteUserSchema.methods = {
  view (full) {
    return {
      name: this.name,
      email: this.email,
      role: this.role,
      token: this.token
    }
  }
}

const model = mongoose.model('InviteUser', inviteUserSchema)

export const schema = model.schema
export default model
