import * as dotenv from 'dotenv'

import express from 'express'
import cors from 'cors'
import * as note from './controllers/note'
import * as user from './controllers/user'
import * as log from './controllers/log'
import { isLogged } from './libs/middlewareLogin'
dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())
const PORT = 3000

app.use(express.static('www'))

app.post('/login', user.login)

app.get('/notes', isLogged, note.list)
app.get('/notes/:id',isLogged, note.get)
app.post('/notes',isLogged, note.create)
app.put('/notes',isLogged, note.update)
app.delete('/notes',isLogged, note.remove)

app.get('/logs', isLogged, log.list)

app.listen(PORT, () => {
  console.log(`⚡️[server]: API rodando em http://localhost:${PORT}`)
})
