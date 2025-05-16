import { ProductRepository } from '@/domain/repositories/product.repository';
import { ProductEntity } from '@/domain/models/product.entity';

export class ListAllProductsUseCase {
  constructor(private readonly repository: ProductRepository.Repository<ProductEntity>) { }

  async execute(): Promise<ProductEntity[]> {
    return this.repository.findAll();
  }
}
