import { EstablishmentRulesEntity, EstablishmentRulesProps } from "@/domain/models/establishmentRules.entity";
import { EstablishmentRulesRepository } from "@/domain/repositories/establishmentRules.repository";


export class CreateEstablishmentRulesUseCase {
  constructor(private readonly repository: EstablishmentRulesRepository.Repository<EstablishmentRulesEntity>) { }

  async execute(input: EstablishmentRulesProps): Promise<EstablishmentRulesEntity> {
    const rule = new EstablishmentRulesEntity({
      establishmentId: input.establishmentId,
      picturesLimit: input.picturesLimit,
      videoLimit: input.videoLimit,
    },);

    await this.repository.save(rule);
    return rule;
  }
}
