import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import jwt from 'express-jwt'
import axios from 'axios'
import { knex } from '../config/database'
const app = express()

app.use(cookieParser())
app.use(bodyParser.json())

app.use(
  jwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['sha1', 'RS256', 'HS256'],
  }).unless({
    path: ['/api/club', /^\/api\/club\/detail\/.*/,"/api/club/register"],
  })
)

app.post('/add', async (req, res) => {
  const { title, owner, location, max, grade, token } = req.body
  const { level } = req.user
  try {
    if (level === 'a') {
      let { data } = await axios.get(
        `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`
      )
      if (data.success) {
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
      } else {
        return res.json({ error: true, message: 'Invalid token' })
      }
    } else {
      return res.json({ error: true, message: "you don't have permission." })
    }
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

app.get('/detail/:id', async (req, res) => {
  let { id } = req.params
  try {
    let result = await knex.select().table('clubs').where('id', id)
    let result_students = await knex('students').where({ select_club_id: id })
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
        students: result_students,
      })),
    })
  } catch (error) {
    res.json({
      error: true,
      message: error.message,
    })
  }
})

app.post('/register', async (req, res) => {
  let { student_code, select_club_id, token } = req.body
  if (student_code.length === 0 || select_club_id.length === 0) {
    return res.json({ error: true, message: 'บางอย่างไม่ครบ' })
  }
  try {
    let { data } = await axios.get(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`
    )
    if (data.success) {
      let result = await knex('students').where({ student_code })
      if (result.length !== 0) {
        return res.json({ error: true, message: 'สมัครไปแล้ว' })
      }

      await knex('students').insert({ student_code, select_club_id })

      res.json({
        error: false,
        message: 'success',
      })
    } else {
      return res.json({ error: true, message: 'Invalid token' })
    }
  } catch (error) {
    res.json({
      error: true,
      message: error.message,
    })
  }
})

app.post('/delete', async (req, res) => {
  let { id } = req.body
  if (req.user.level === 'a') {
    try {
      await knex.select().table('clubs').where('id', id).del()
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
  } else {
    return res.json({ error: true, message: "you don't have permission." })
  }
})

app.post('/update', async (req, res) => {
  const { id, title, owner, location, max, grade, open } = req.body
  const { level } = req.user
  if (level === 'a') {
    // let { data } = await axios.get(
    //   `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`
    // )
    try {
      //   if (data.success) {
      await knex
        .select()
        .table('clubs')
        .where('id', id)
        .update({
          title,
          owner: JSON.stringify(owner),
          location,
          max,
          grade: JSON.stringify(grade),
          open,
        })
      res.json({
        error: false,
        message: 'success',
      })
      //   } else {
      //     return res.json({ error: true, message: 'Invalid token' })
      //   }
    } catch (error) {
      res.json({
        error: true,
        message: error.message,
      })
    }
  } else {
    return res.json({ error: true, message: "you don't have permission." })
  }
})

// -- export app --
export default {
  path: '/api/club',
  handler: app,
}
