import { ProductRepository } from '@/domain/repositories/product.repository';
import { ProductEntity, ProductProps } from '@/domain/models/product.entity';

export class UpdateProductUseCase {
  constructor(private readonly repository: ProductRepository.Repository<ProductEntity>) { }

  async execute(id: string, input: ProductProps): Promise<ProductEntity> {
    const product = await this.repository.findById(id);
    if (!product) {
      throw new Error(`Product with id ${id} not found`);
    }

    product.update({
      name: input.name,
      price: input.price,
    });

    return this.repository.update(product);
  }
}
