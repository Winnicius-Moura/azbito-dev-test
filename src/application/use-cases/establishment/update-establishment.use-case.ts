import { EstablishmentEntity, EstablishmentProps } from "@/domain/models/establishment.entity";
import { EstablishmentRepository } from "@/domain/repositories/establishment.repository";
import { EstablishmentType } from "@/shared/utils/types";

export class UpdateEstablishmentUseCase {
  constructor(private readonly repository: EstablishmentRepository.Repository<EstablishmentEntity>) { }

  async execute(id: string, input: EstablishmentProps): Promise<EstablishmentEntity> {
    const existingEstablishment = await this.repository.findById(id);
    if (!existingEstablishment) {
      throw new Error('Establishment not found');
    }

    existingEstablishment.update({
      name: input.name,
      ownerId: input.ownerId,
      type: input.type ? EstablishmentType.validate(input.type) : existingEstablishment.props.type,
    });

    return this.repository.update(existingEstablishment)
  }
}