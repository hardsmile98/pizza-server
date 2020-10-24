import mongoose from 'mongoose'
import { IUser } from '../interfaces/interfaces'

const User = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    required: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  confirmed: {
    type: Boolean,
    required: true,
    default: false,
  },
})

export default mongoose.model<IUser>('User', User)
