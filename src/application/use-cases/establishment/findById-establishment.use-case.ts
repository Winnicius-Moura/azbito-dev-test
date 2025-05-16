import { EstablishmentEntity } from '@/domain/models/establishment.entity'
import { EstablishmentRepository } from '@/domain/repositories/establishment.repository'

export class FindEstablishmentByIdUseCase {
  constructor(private readonly repository: EstablishmentRepository.Repository<EstablishmentEntity>) { }

  async execute(id: string): Promise<EstablishmentEntity | null> {
    try {
      return await this.repository.findById(id)
    } catch (error) {
      console.error('Error in FindUserByIdUseCase:', error)
      throw error
    }
  }
}
