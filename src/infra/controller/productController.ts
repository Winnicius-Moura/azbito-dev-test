import { Request, Response } from 'express';
import { DynamoProvider } from '@/shared/infrastructure/persistence/dynamo-provider';
import { CreateProductUseCase } from '@/application/use-cases/products/create-products.use-case';

export class ProductController {
  static async create(req: Request, res: Response) {
    try {
      const repo = DynamoProvider.getProductRepository()
      const useCase = new CreateProductUseCase(repo)
      const product = await useCase.execute(req.body)
      res.status(201).json(product.toJSON())
    } catch (error) {
      res.status(400).json({ message: error instanceof Error ? error.message : 'Erro ao criar produto' });
    }
  }

}
