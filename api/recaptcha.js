import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import axios from 'axios'
const app = express()

app.use(cookieParser())
app.use(bodyParser.json())

app.post('/', async (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  try {
    const { token } = req.body

    if (!token) {
      return res.json({
        success: false,
        message: 'Invalid token',
      })
    }
    let {data} = await axios.get(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`)

    if (data.success) {
      return res.json({
        success: true,
        message: 'Token verifyed',
        response: data,
      })
    } else {
      return res.json({
        success: false,
        message: 'Invalid token',
        response: data,
      })
    }
  } catch (e) {
    console.log('ReCaptcha error:', e)
    return res.json({
      success: false,
      message: 'Internal error',
    })
  }
})

export default {
  path: '/api/check-token',
  handler: app,
}
