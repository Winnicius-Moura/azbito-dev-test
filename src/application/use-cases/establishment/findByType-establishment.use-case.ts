import { EstablishmentRepository } from '@/domain/repositories/establishment.repository';
import { EstablishmentEntity } from '@/domain/models/establishment.entity';

export class FindEstablishmentsByTypeUseCase {
  constructor(private readonly repository: EstablishmentRepository.Repository<EstablishmentEntity>) { }

  async execute(type: string): Promise<EstablishmentEntity[]> {
    return this.repository.findByType(type);
  }
}
