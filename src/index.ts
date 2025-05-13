import express from 'express'
import dotenv from 'dotenv'
import { initDatabase } from '@/config/startup/init-db'

dotenv.config()
const app = express()
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World')
})

const PORT = process.env.PORT || 3000

async function startServer() {
  try {
    await initDatabase()

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  } catch (error) {
    console.error('Erro ao conectar com o DynamoDB:', error)
    process.exit(1)
  }
}

startServer()