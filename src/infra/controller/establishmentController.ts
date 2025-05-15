import { CreateEstablishmentUseCase } from "@/application/use-cases/establishment/create-establishment.use-case"
import { FindEstablishmentByIdUseCase } from "@/application/use-cases/establishment/findById-establishment.use-case"
import { DynamoProvider } from "@/shared/infrastructure/persistence/dynamo-provider"
import { Request, Response } from 'express'

export class EstablishmentController {
  static async create(req: Request, res: Response) {
    try {
      const establishmentRepository = DynamoProvider.getEstablishmentRepository()
      const userRepository = DynamoProvider.getUserRepository()
      const useCase = new CreateEstablishmentUseCase(userRepository, establishmentRepository)
      const establishment = await useCase.execute(req.body)

      res.status(201).json(establishment.toJSON())
    } catch (error) {
      res.status(400).json({
        error: error instanceof Error ? error.message : 'Unexpected error'
      })
    }
  }

  static async findById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params
      const repository = DynamoProvider.getEstablishmentRepository()
      const useCase = new FindEstablishmentByIdUseCase(repository)
      const establishment = await useCase.execute(id)

      if (!establishment) {
        res.status(404).json({ message: `Establishment with id ${id} not found` })
        return
      }

      res.status(200).json(establishment.toJSON())
    } catch (error) {
      console.error('FindEstablishmentByIdUseCase error:', error)
      res.status(500).json({
        message: error instanceof Error ? error.message : 'Internal server error'
      })
    }
  }
}