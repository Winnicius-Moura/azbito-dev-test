import { EstablishmentEntity, EstablishmentProps } from "@/domain/models/establishment.entity";
import { EstablishmentRepository } from "@/domain/repositories/establishment.repository";
import { EstablishmentType } from "@/shared/utils/types";

export class UpdateEstablishmentUseCase {
  constructor(private readonly repository: EstablishmentRepository.Repository<EstablishmentEntity>) { }

  async execute(id: string, input: EstablishmentProps): Promise<EstablishmentEntity> {
    const response = await this.repository.findById(id);
    if (!response) {
      throw new Error('Establishment not found');
    }

    response.update({
      name: input.name,
      ownerId: input.ownerId,
      type: input.type ? EstablishmentType.validate(input.type) : response.props.type,
    });

    return this.repository.update(response)
  }
}