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
  })
)

app.post('/add', async (req, res) => {
  const {
    student_code,
    citizen_id,
    first_name,
    last_name,
    grade,
    room,
  } = req.body
  const { level } = req.user
  try {
    if (level === 'a') {
      await knex('students').insert({
        student_code,
        citizen_id,
        first_name,
        last_name,
        grade,
        room,
        timestamp: new Date().toISOString(),
      })
      res.json({
        error: false,
        message: 'success',
      })
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
    let result = await knex.select().table('students')
    res.json({
      error: false,
      message: 'success',
      data: result.map((item) => ({
        assessment_results: item.assessment_results,
        // citizen_id: item.citizen_id,
        name: { first_name: item.first_name, last_name: item.last_name },
        grade: { grade: item.grade, room: item.room },
        id: item.id,
        select_club_id: item.select_club_id,
        student_code: item.student_code,
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

app.post('/delete', async (req, res) => {
  let { id } = req.body
  if (req.user.level === 'a') {
    try {
      await knex.select().table('students').where('id', id).del()
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
  const {
    id,
    student_code,
    citizen_id,
    first_name,
    last_name,
    grade,
    room,
  } = req.body
  const { level } = req.user
  if (level === 'a') {
    try {
      await knex.select().table('students').where('id', id).update({
        student_code,
        citizen_id,
        first_name,
        last_name,
        grade,
        room,
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
  } else {
    return res.json({ error: true, message: "you don't have permission." })
  }
})

// -- export app --
export default {
  path: '/api/students',
  handler: app,
}
