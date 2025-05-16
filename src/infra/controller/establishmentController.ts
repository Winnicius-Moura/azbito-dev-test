import { CreateEstablishmentUseCase } from "@/application/use-cases/establishment/create-establishment.use-case"
import { DeleteEstablishmentUseCase } from "@/application/use-cases/establishment/delete-establishment.use-case"
import { FindEstablishmentByIdUseCase } from "@/application/use-cases/establishment/findById-establishment.use-case"
import { FindEstablishmentsByTypeUseCase } from "@/application/use-cases/establishment/findByType-establishment.use-case"
import { ListEstablishmentUseCase } from "@/application/use-cases/establishment/list-establishment.use-case"
import { UpdateEstablishmentUseCase } from "@/application/use-cases/establishment/update-establishment.use-case"
import { DynamoProvider } from "@/shared/infrastructure/persistence/dynamo-provider"
import { EstablishmentType } from "@/shared/utils/types"
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

  static async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params
      const repository = DynamoProvider.getEstablishmentRepository()
      const useCase = new UpdateEstablishmentUseCase(repository)
      const establishment = await useCase.execute(id, req.body)

      res.status(200).json({ establishment, message: `Establishment ${establishment.props.name} updated!` })
    } catch (error) {
      if (error === 'Establishmenter not found') {
        res.status(404).json({ message: error })
      } else {
        console.error('UpdateEstablishment error:', error)
        res.status(400).json({
          error: error instanceof Error ? error.message : 'Update failed'
        })
      }
    }
  }

  static async findAll(req: Request, res: Response): Promise<void> {
    const { type } = req.query;

    if (type) {
      try {
        const repository = DynamoProvider.getEstablishmentRepository()
        const useCase = new FindEstablishmentsByTypeUseCase(repository)

        const validatedType = EstablishmentType.validate(type?.toString() || '');
        const establishments = await useCase.execute(validatedType)

        res.status(200).json(establishments.map(establishment => establishment.toJSON()))
      } catch (error) {
        res.status(500).json({ message: 'Error retrieving establishments' });
      }
    }

    try {
      const repository = DynamoProvider.getEstablishmentRepository()
      const useCase = new ListEstablishmentUseCase(repository)
      const establishments = await useCase.execute()

      res.status(200).json(establishments?.map((establishment) => establishment.toJSON()))
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' })
    }
  }

  static async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params
      const repository = DynamoProvider.getEstablishmentRepository()
      const useCase = new DeleteEstablishmentUseCase(repository)

      await useCase.execute(id)
      res.status(200).send({ message: 'Estabelecimento deletado' })
    } catch (error) {
      if (error instanceof Error && error.message.includes('does not exist')) {
        res.status(404).json({ message: error.message })
      }

      res.status(500).json({ message: 'Internal server error' })
    }
  }



}