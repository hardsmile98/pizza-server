import mongoose from 'mongoose'

export interface IUser extends mongoose.Document {
  email: string
  password: string
  confirmed: boolean
}

export interface IProduct extends mongoose.Document {
  category: string
  title: string
  price: number
  description: string
  image: string
}

export interface IOrder extends mongoose.Document {
  owner: string
  total: number
  items: Array<{
    id: string
    count: number
  }>
  createdAt: Date
}
