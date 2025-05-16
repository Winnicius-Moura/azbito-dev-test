import { EstablishmentRulesEntity } from "@/domain/models/establishmentRules.entity";
import { ProductEntity, ProductProps } from "@/domain/models/product.entity";
import { EstablishmentRulesRepository } from "@/domain/repositories/establishmentRules.repository";
import { ProductRepository } from "@/domain/repositories/product.repository";

export class CreateProductUseCase {
  constructor(
    private readonly rulesRepository: EstablishmentRulesRepository.Repository<EstablishmentRulesEntity>,
    private readonly repository: ProductRepository.Repository<ProductEntity>
  ) { }

  async execute(input: ProductProps): Promise<ProductEntity> {
    const rules = await this.rulesRepository.findByEstablishmentId(input.establishmentId)
    if (!rules) throw new Error('Establishment rules not found')

    const existingProducts = await this.repository.findAll();

    const productsFromThisEstablishment = existingProducts.filter(
      p => p.props.establishmentId === input.establishmentId
    )
    const productCount = productsFromThisEstablishment.filter(
      (_, index) => index < rules.props.picturesLimit).length


    const videoCount = productsFromThisEstablishment.filter(
      (_, index) => index < rules.props.videoLimit
    ).length;

    rules.validateProductCreation(productCount, videoCount)


    const product = new ProductEntity({
      name: input.name,
      price: input.price,
      establishmentId: input.establishmentId,
    },);

    return await this.repository.save(product)
  }
}