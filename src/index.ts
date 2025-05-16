import express from 'express'
import dotenv from 'dotenv'
import { initDatabase } from '@/config/startup/init-db'
import userRoutes from '@/config/routes/user.routes'
import establishmentRoutes from '@/config/routes/establishment.routes'
import productsRoutes from '@/config/routes/products.routes'
import establishmentRulesRoutes from '@/config/routes/establishmentRules.routes'

dotenv.config()


const PORT = process.env.PORT || 3000
const app = express()
app.use(express.json())

app.use('/users', userRoutes)

app.use('/establishments', establishmentRoutes)
app.use('/establishments/rules', establishmentRulesRoutes)
app.use('/products', productsRoutes)

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