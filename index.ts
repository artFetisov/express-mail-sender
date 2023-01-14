import { IMailDTO } from './dto'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express, { Express, Request, Response } from 'express'

dotenv.config()

const mailService = require('./mail-service')

const app: Express = express()

app.use(cors())
app.use(bodyParser.json())

const PORT = process.env.PORT || 5000

app.post('/send-mail', async (req: Request, res: Response) => {
  try {
    const data: IMailDTO = req.body

    await mailService.sendEmail(data)

    res.send('message is send!')
  } catch (error) {
    console.log('ERROR')
    console.log(error)
  }
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
