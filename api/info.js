import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import { knex } from '../config/database'
const app = express()

app.use(cookieParser())
app.use(bodyParser.json())

app.get('/', async (req, res) => {
  let resultClubs = await knex.raw(
    `(SELECT COUNT(id) FROM students WHERE select_club_id != 0 ) UNION (SELECT COUNT(id) FROM clubs)`
  )
  return res.json({
    error: false,
    message: 'success',
    data: {
      clubs: resultClubs[0][1]['COUNT(id)'],
      students: resultClubs[0][0]['COUNT(id)']
    },
  })
})
// -- export app --
export default {
  path: '/api/info',
  handler: app,
}
