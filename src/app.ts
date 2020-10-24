import express, { Application } from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import config from 'config'
import auth from './routes/auth'
import confirmed from './routes/confirmed'
import product from './routes/product'
import order from './routes/order'

const app: Application = express()

app.use(cors())
app.use(express.json())

app.use('/', confirmed)
app.use('/api/v1/auth', auth)
app.use('/api/v1/product', product)
app.use('/api/v1/order', order)

const PORT = process.env.PORT || '5000'
async function start() {
  try {
    await mongoose.connect(config.get('mongoUrl'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    app.listen(PORT, () => {
      console.log(`server start http://localhost:${PORT}`)
    })
  } catch (error) {
    console.log('server error', error)
    process.exit(1)
  }
}

start()
