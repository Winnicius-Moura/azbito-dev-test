import { UserEntity } from "@/domain/models/user.entity";
import { UserRepository } from "@/domain/repositories/user.repository";

export class ListUsersUseCase {
  constructor(private readonly repository: UserRepository.Repository<UserEntity>) { }

  async execute(): Promise<UserEntity[]> {
    return this.repository.findAll()
  }
}