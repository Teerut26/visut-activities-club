import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import jwt from 'express-jwt'
import jsonwebtoken from 'jsonwebtoken'
import { con, knex } from '../config/database'
const bcrypt = require('bcrypt')

const expiresIn = 60 * 60 * 24
const app = express()

app.use(cookieParser())
app.use(bodyParser.json())

app.use(
  jwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['sha1', 'RS256', 'HS256'],
  }).unless({
    path: ['/api/auth/login'],
  })
)

app.post('/login', async (req, res) => {
  const { username, password } = req.body
  try {
    let result = await knex.select().table('users').where({ username })
    if (result.length === 0)
      return res.json({ error: true, message: 'ไม่บพ username นี้' })
    if (await bcrypt.compare(password, result[0].password)) {
      const accessToken = jsonwebtoken.sign(
        {
          username,
          id: result[0].id,
        },
        process.env.JWT_SECRET,
        {
          expiresIn,
        }
      )
      res.json({
        token: {
          accessToken,
        },
      })
    } else {
      return res.json({ error: true, message: 'รหัสไม่ถูกต้อง' })
    }
  } catch (error) {
    res.json({
      error: true,
      message: error.message,
    })
  }

  
})
app.get('/user', (req, res) => {
  res.json({ user: req.user })
})

app.post('/add', (req, res) => {
  res.json({ user: req.user })
})

app.post('/logout', (_req, res) => {
  res.json({ status: 'OK' })
})

// -- export app --
export default {
  path: '/api/auth',
  handler: app,
}
