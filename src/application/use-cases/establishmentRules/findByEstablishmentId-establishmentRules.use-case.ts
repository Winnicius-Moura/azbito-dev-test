import { EstablishmentRulesEntity } from '@/domain/models/establishmentRules.entity';
import { EstablishmentRulesRepository } from '@/domain/repositories/establishmentRules.repository';

export class FindEstablishmentRulesByEstablishmentIdUseCase {
  constructor(private readonly repository: EstablishmentRulesRepository.Repository<EstablishmentRulesEntity>) { }

  async execute(id: string): Promise<EstablishmentRulesEntity | null> {
    return this.repository.findByEstablishmentId(id);
  }
}
