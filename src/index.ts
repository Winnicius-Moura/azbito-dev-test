import express from 'express'
import dotenv from 'dotenv'
import { initDatabase } from '@/config/startup/init-db'
import userRoutes from '@/config/routes/user.routes'
import establishmentRoutes from '@/config/routes/establishment.routes'
dotenv.config()


const PORT = process.env.PORT || 3000
const app = express()
app.use(express.json())

app.use('/users', userRoutes)

app.use('/establishment', establishmentRoutes)

app.get('/', (req, res) => {
  res.send('Hello World')
})

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