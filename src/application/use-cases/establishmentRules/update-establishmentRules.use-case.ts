import { EstablishmentRulesEntity, EstablishmentRulesProps } from '@/domain/models/establishmentRules.entity';
import { EstablishmentRulesRepository } from '@/domain/repositories/establishmentRules.repository';

export class UpdateEstablishmentRulesUseCase {
  constructor(private readonly repository: EstablishmentRulesRepository.Repository<EstablishmentRulesEntity>) { }

  async execute(id: string, input: EstablishmentRulesProps): Promise<EstablishmentRulesEntity> {
    const rule = await this.repository.findByEstablishmentId(id)
    if (!rule) {
      throw new Error(`Rule with id ${id} not found`);
    }

    rule.update(input)

    return this.repository.update(rule)
  }
}
