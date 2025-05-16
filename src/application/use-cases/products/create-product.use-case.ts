import { ProductEntity, ProductProps } from "@/domain/models/product.entity";
import { ProductRepository } from "@/domain/repositories/product.repository";

export class CreateProductUseCase {
  constructor(private readonly repository: ProductRepository.Repository<ProductEntity>) { }

  async execute(input: ProductProps): Promise<ProductEntity> {
    const product = new ProductEntity({
      name: input.name,
      price: input.price,
      establishmentId: input.establishmentId,
    },);

    return await this.repository.save(product)
  }
}