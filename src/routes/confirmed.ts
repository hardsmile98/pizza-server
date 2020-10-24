import { Request, Response, Router } from 'express'
import jwt from 'jsonwebtoken'
import config from 'config'
import User from '../models/User'
import { IUser } from '../interfaces/interfaces'
const router = Router()

router.get('/confirmed/:conf', async (req: Request, res: Response) => {
  try {
    const conf = req.params.conf
    const decode: any = jwt.verify(conf, config.get('confSecret'))

    let user: IUser | null = await User.findById(decode.id)

    if (user) {
      if (user.confirmed) {
        res.send('Email уже подтвержден')
      }
      user.confirmed = true
      await user.save()
      return res.redirect(config.get('clientURL'))
    } else {
      res.send('Ссылка невалидна')
    }
  } catch (e) {
    res.send('Ссылка невалидна')
  }
})

export default router
