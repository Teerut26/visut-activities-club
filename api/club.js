import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import jwt from 'express-jwt'
import { knex } from '../config/database'
const app = express()

app.use(cookieParser())
app.use(bodyParser.json())

app.use(
  jwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['sha1', 'RS256', 'HS256'],
  }).unless({
    path: ['/api/club'],
  })
)

app.post('/add', async (req, res) => {
  const { title, owner, location, max, grade } = req.body
  try {
    await knex('clubs').insert({
      title: title,
      owner: JSON.stringify(owner),
      location: location,
      max: max,
      grade: JSON.stringify(grade),
      timestamp: new Date().toISOString(),
    })
    res.json({
      error: false,
      message: 'success',
    })
  } catch (error) {
    res.json({
      error: true,
      message: error.message,
    })
  }
})

app.get('/', async (req, res) => {
  try {
    let result = await knex.select().table('clubs')
    res.json({
      error: false,
      message: 'success',
      data: result.map((item) => ({
        id: item.id,
        title: item.title,
        owner: JSON.parse(item.owner),
        location: item.location,
        max: item.max,
        grade: JSON.parse(item.grade),
        open: item.open,
        timestamp: item.timestamp,
      })),
    })
  } catch (error) {
    res.json({
      error: true,
      message: error.message,
    })
  }
})

// -- export app --
export default {
  path: '/api/club',
  handler: app,
}
