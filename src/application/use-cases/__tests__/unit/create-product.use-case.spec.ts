import { CreateProductUseCase } from '@/application/use-cases/products/create-product.use-case'
import { EstablishmentRulesEntity } from '@/domain/models/establishmentRules.entity'
import { ProductEntity } from '@/domain/models/product.entity'

describe('CreateProductUseCase', () => {
  const establishmentId = 'est-123'

  const makeRulesEntity = () =>
    new EstablishmentRulesEntity({
      establishmentId,
      picturesLimit: 2,
      videoLimit: 1,
    })

  const makeProduct = (name: string) =>
    new ProductEntity({
      name,
      price: 10,
      establishmentId,
    })

  it('should create a product if within limits', async () => {
    const rules = makeRulesEntity()
    const repository = {
      findAll: jest.fn().mockResolvedValue([]),
      save: jest.fn().mockImplementation((p) => Promise.resolve(p)),
    }
    const rulesRepo = {
      findByEstablishmentId: jest.fn().mockResolvedValue(rules),
    }

    const useCase = new CreateProductUseCase(rulesRepo as any, repository as any)

    const result = await useCase.execute({
      name: 'Produto X',
      price: 10,
      establishmentId,
    })

    expect(result.props.name).toBe('Produto X')
    expect(repository.save).toHaveBeenCalled()
  })

  it('should throw if rules are not found', async () => {
    const rulesRepo = {
      findByEstablishmentId: jest.fn().mockResolvedValue(null),
    }
    const repository = {
      findAll: jest.fn(),
      save: jest.fn(),
    }

    const useCase = new CreateProductUseCase(rulesRepo as any, repository as any)

    await expect(
      useCase.execute({
        name: 'Produto Y',
        price: 10,
        establishmentId,
      })
    ).rejects.toThrow('Establishment rules not found')
  })

  it('should throw if picture limit is exceeded', async () => {
    const rules = makeRulesEntity()
    const existingProducts = [makeProduct('1'), makeProduct('2')]

    const rulesRepo = {
      findByEstablishmentId: jest.fn().mockResolvedValue(rules),
    }
    const repository = {
      findAll: jest.fn().mockResolvedValue(existingProducts),
      save: jest.fn(),
    }

    const useCase = new CreateProductUseCase(rulesRepo as any, repository as any)

    await expect(
      useCase.execute({
        name: 'Produto extra',
        price: 20,
        establishmentId,
      })
    ).rejects.toThrow(/limit of 2 reached/)
  })

  it('should throw if video limit is exceeded', async () => {
    const rules = new EstablishmentRulesEntity({
      establishmentId,
      picturesLimit: 10,
      videoLimit: 1,
    })

    const existingProducts = [makeProduct('Video Produto')]

    const rulesRepo = {
      findByEstablishmentId: jest.fn().mockResolvedValue(rules),
    }
    const repository = {
      findAll: jest.fn().mockResolvedValue(existingProducts),
      save: jest.fn(),
    }

    const useCase = new CreateProductUseCase(rulesRepo as any, repository as any)

    await expect(
      useCase.execute({
        name: 'Segundo vídeo',
        price: 15,
        establishmentId,
      })
    ).rejects.toThrow(/video limit of 1 reached/)
  })
})
