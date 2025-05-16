import { ProductRepository } from '@/domain/repositories/product.repository';
import { ProductEntity } from '@/domain/models/product.entity';

export class FindProductByIdUseCase {
  constructor(private readonly repository: ProductRepository.Repository<ProductEntity>) { }

  async execute(id: string): Promise<ProductEntity | null> {
    return this.repository.findById(id);
  }
}
