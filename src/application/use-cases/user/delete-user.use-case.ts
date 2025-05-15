import { UserEntity } from "@/domain/models/user.entity"
import { UserRepository } from "@/domain/repositories/user.repository"

export class DeleteUserUseCase {
  constructor(private readonly repository: UserRepository.Repository<UserEntity>) { }

  async execute(id: string): Promise<void> {
    return this.repository.delete(id)
  }
}
