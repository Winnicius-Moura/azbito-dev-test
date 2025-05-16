import { EstablishmentRulesEntity } from '@/domain/models/establishmentRules.entity';
import { EstablishmentRulesRepository } from '@/domain/repositories/establishmentRules.repository';

export class DeleteEstablishmentRulesUseCase {
  constructor(private readonly repository: EstablishmentRulesRepository.Repository<EstablishmentRulesEntity>) { }

  async execute(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
