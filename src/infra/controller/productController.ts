import { Request, Response } from 'express';
import { DynamoProvider } from '@/shared/infrastructure/persistence/dynamo-provider';
import { CreateProductUseCase } from '@/application/use-cases/products/create-product.use-case';
import { FindProductByIdUseCase } from '@/application/use-cases/products/findById-product.use-case';
import { DeleteProductUseCase } from '@/application/use-cases/products/delete-product.use-case';
import { ListAllProductsUseCase } from '@/application/use-cases/products/list-product.use-case';
import { UpdateProductUseCase } from '@/application/use-cases/products/update-product.use-case';

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


  static async findById(req: Request, res: Response): Promise<void> {
    try {
      const repo = DynamoProvider.getProductRepository();
      const useCase = new FindProductByIdUseCase(repo);
      const product = await useCase.execute(req.params.id);

      if (!product) {
        res.status(404).json({ message: 'Product not found' });
      }

      res.status(200).json(product?.toJSON());
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params

      const repo = DynamoProvider.getProductRepository();
      const useCase = new UpdateProductUseCase(repo);
      const updated = await useCase.execute(id, req.body);

      res.status(200).json(updated?.toJSON());
    } catch (error) {
      res.status(400).json({ message: error instanceof Error ? error.message : 'Update failed' });
    }
  }

  static async delete(req: Request, res: Response): Promise<void> {
    try {
      const repo = DynamoProvider.getProductRepository();
      const useCase = new DeleteProductUseCase(repo);
      await useCase.execute(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async findAll(req: Request, res: Response): Promise<void> {
    try {
      const repo = DynamoProvider.getProductRepository();
      const useCase = new ListAllProductsUseCase(repo);
      const products = await useCase.execute();
      res.status(200).json(products.map(p => p.toJSON()));
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }

}
