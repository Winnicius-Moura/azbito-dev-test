import { CreateEstablishmentRulesUseCase } from '@/application/use-cases/establishmentRules/create-establishmentRules.use-case';
import { DeleteEstablishmentRulesUseCase } from '@/application/use-cases/establishmentRules/delete-establishmentRules.use-case';
import { FindEstablishmentRulesByEstablishmentIdUseCase } from '@/application/use-cases/establishmentRules/findByEstablishmentId-establishmentRules.use-case';
import { UpdateEstablishmentRulesUseCase } from '@/application/use-cases/establishmentRules/update-establishmentRules.use-case';
import { DynamoProvider } from '@/shared/infrastructure/persistence/dynamo-provider';
import { Request, Response } from 'express';

export class EstablishmentRulesController {
  static async create(req: Request, res: Response) {
    try {
      const repo = DynamoProvider.getEstablishmentRulesRepository();
      const useCase = new CreateEstablishmentRulesUseCase(repo);
      const rule = await useCase.execute(req.body);
      res.status(201).json(rule.toJSON());
    } catch (error) {
      res.status(400).json({ message: error instanceof Error ? error.message : 'Erro interno' });
    }
  }

  static async findByEstablishmentId(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params
      const repo = DynamoProvider.getEstablishmentRulesRepository()
      const useCase = new FindEstablishmentRulesByEstablishmentIdUseCase(repo)
      const establishmentRule = await useCase.execute(id)

      if (!establishmentRule) {
        res.status(404).json({ message: 'Rule not found' });
      }

      res.status(200).json(establishmentRule?.toJSON());
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }


  static async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params
      const repo = DynamoProvider.getEstablishmentRulesRepository()
      const useCase = new UpdateEstablishmentRulesUseCase(repo)
      const updated = await useCase.execute(id, req.body)

      res.status(200).json(updated?.toJSON())
    } catch (error) {
      res.status(400).json({ message: error instanceof Error ? error.message : 'Update failed' });
    }
  }


  static async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params
      const repository = DynamoProvider.getEstablishmentRulesRepository()
      const useCase = new DeleteEstablishmentRulesUseCase(repository)

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
