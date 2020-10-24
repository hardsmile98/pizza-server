import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import config from 'config'

export default (req: any, res: Response, next: NextFunction) => {
  if (req.method === 'OPTIONS') {
    return next()
  }
  try {
    const token = req.headers.authorization.split(' ')[1]
    if (!token) {
      return res.status(401).json({ message: 'Нет авторизации' })
    }
    const decode: any = jwt.verify(token, config.get('tokenSecret'))
    req.id = decode.id
    next()
  } catch (e) {
    res.status(401).json({ message: 'Нет авторизации' })
  }
}
