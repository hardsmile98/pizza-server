import { count } from 'console'
import mongoose from 'mongoose'
import { IOrder } from '../interfaces/interfaces'

const Order = new mongoose.Schema({
  owner: { type: mongoose.Types.ObjectId, ref: 'User' },
  total: { type: Number, required: true },
  items: [
    {
      _id: { type: mongoose.Types.ObjectId, ref: 'Product' },
      count: { type: Number, required: true },
      title: { type: String, required: true },
    },
  ],
  name: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.model<IOrder>('Order', Order)
