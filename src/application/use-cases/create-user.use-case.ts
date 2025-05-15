import { UserEntity } from "@/domain/models/user.entity"
import { UserRepository } from "@/domain/repositories/user.repository"
import { UserType } from "@/shared/utils/types"

export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository.Repository<UserEntity>) { }

  async execute(input: {
    name: string
    email: string
    type: UserType
  }): Promise<UserEntity> {
    UserEntity.validate(input)
    const user = new UserEntity({
      name: input.name,
      email: input.email,
      type: input.type,
    },)

    return this.userRepository.save(user)
  }
}