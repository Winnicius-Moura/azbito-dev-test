import { EstablishmentEntity } from '@/domain/models/establishment.entity'
import { RepositoryInterface } from '@/shared/repositories/repository-contracts'

export class FindEstablishmentByIdUseCase {
  constructor(private readonly repository: RepositoryInterface<EstablishmentEntity>) { }

  async execute(id: string): Promise<EstablishmentEntity | null> {
    try {
      return await this.repository.findById(id)
    } catch (error) {
      console.error('Error in FindUserByIdUseCase:', error)
      throw error
    }
  }
}
