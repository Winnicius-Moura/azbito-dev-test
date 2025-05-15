import { CreateUserUseCase } from '@/application/use-cases/create-user.use-case';
import { FindUserByIdUseCase } from '@/application/use-cases/findById-user.use-case';
import { DynamoProvider } from '@/shared/infrastructure/persistence/dynamo-provider';
import { Request, Response } from 'express';

export class UserController {
  static async create(req: Request, res: Response) {
    try {
      const repository = DynamoProvider.getUserRepository();
      const useCase = new CreateUserUseCase(repository);
      const user = await useCase.execute(req.body);

      res.status(201).json(user.toJSON());
    } catch (error) {
      res.status(400).json({
        error: error instanceof Error ? error.message : 'Unexpected error'
      });
    }
  }

  static async findById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const repository = DynamoProvider.getUserRepository();
      const useCase = new FindUserByIdUseCase(repository);
      const user = await useCase.execute(id);

      if (!user) {
        res.status(404).json({ message: `User with id ${id} not found` });
        return;
      }

      res.status(200).json(user.toJSON());
    } catch (error) {
      console.error('FindUserById error:', error);
      res.status(500).json({
        message: error instanceof Error ? error.message : 'Internal server error'
      });
    }
  }
}