import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import jwt from 'express-jwt'
import axios from 'axios'
import { knex } from '../config/database'
import { getSutudentFromID } from './modal/clubs'
const app = express()

app.use(cookieParser())
app.use(bodyParser.json())

app.get('/', async (req, res) => {
  res.send(555)
})
// -- export app --
export default {
  path: '/api/info',
  handler: app,
}
