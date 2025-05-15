import { CreateEstablishmentUseCase } from "@/application/use-cases/establishment/create-establishment.use-case"
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
}