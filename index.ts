import {IMailDTO} from './dto'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express, {Express, Request, Response} from 'express'
import {corsMiddleware} from './cors.middleware'

dotenv.config()

const mailService = require('./mail-service')

const app: Express = express()
const PORT = process.env.PORT || 5000

app.use(corsMiddleware)
app.use(cors())
app.use(bodyParser.json())

app.get('/', (req: Request, res: Response) => {
    res.send({
        art: process.env.SMTP_SERVICE,
        user: process.env.SMTP_USER,
    })
})

app.post('/send-mail', async (req: Request, res: Response) => {
    try {
        const data: IMailDTO = req.body

        res.status(200).send(data)

        // await mailService.sendEmail(data)
    } catch (error) {
        console.log('ERROR')
        console.log(error)
    }
})

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})
