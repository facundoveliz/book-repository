import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import cors from 'cors'

import routes from './routes'
import { errorHandler, notFound } from './middleware/errorHandlerMiddleware'

const app = express()

dotenv.config()

app.use(express.json())
app.use(cors({ credentials: true }))
app.use(morgan('dev'))
app.use(routes)

const port = process.env.PORT ?? 3000
app.listen(port, () => console.log(`Listening on port ${port}...`))

app.use(notFound)
app.use(errorHandler)
