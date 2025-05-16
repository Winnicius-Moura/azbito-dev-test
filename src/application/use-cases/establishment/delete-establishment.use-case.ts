import { EstablishmentEntity } from "@/domain/models/establishment.entity"
import { EstablishmentRepository } from "@/domain/repositories/establishment.repository"

export class DeleteEstablishmentUseCase {
  constructor(private readonly repository: EstablishmentRepository.Repository<EstablishmentEntity>) { }

  async execute(id: string): Promise<void> {
    return this.repository.delete(id)
  }
}
