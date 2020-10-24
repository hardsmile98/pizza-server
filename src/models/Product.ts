import mongoose from 'mongoose'
import { IProduct } from '../interfaces/interfaces'

const Product = new mongoose.Schema({
  category: { type: String, required: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
})

export default mongoose.model<IProduct>('Product', Product)
