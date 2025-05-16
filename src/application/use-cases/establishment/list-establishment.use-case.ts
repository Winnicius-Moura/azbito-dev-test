import { EstablishmentEntity } from "@/domain/models/establishment.entity"
import { EstablishmentRepository } from "@/domain/repositories/establishment.repository"

export class ListEstablishmentUseCase {
  constructor(private readonly repository: EstablishmentRepository.Repository<EstablishmentEntity>) { }

  async execute(): Promise<EstablishmentEntity[]> {
    return this.repository.findAll()
  }
}