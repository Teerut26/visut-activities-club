import express from 'express'
import jsonwebtoken from 'jsonwebtoken'
import { con } from '../config/database'
import bodyParser from 'body-parser'
const app = express()
const bcrypt = require('bcrypt')

app.use(bodyParser.json())
app.post('/', async (req, res) => {
  const { pass, test } = req.query
  let hash = await bcrypt.hash(pass, 10)
  let result = await bcrypt.compare(test, hash)
  res.json({
    hash: hash,
    result: result,
  })
})

export default {
  path: '/api/getpass',
  handler: app,
}
