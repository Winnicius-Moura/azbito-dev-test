import { UserEntity, UserType } from "@/domain/models/user.entity"
import { UserRepository } from "@/domain/repositories/user.repository"

export class UpdateUserUseCase {
  constructor(private readonly repository: UserRepository.Repository<UserEntity>) { }

  async execute(id: string, input: {
    name?: string
    email?: string
    type?: string
  }): Promise<UserEntity> {
    const existingUser = await this.repository.findById(id);
    if (!existingUser) {
      throw new Error('User not found');
    }

    existingUser.update({
      name: input.name,
      email: input.email,
      type: input.type ? UserType.validate(input.type) : existingUser.props.type,
    });

    return this.repository.update(existingUser)
  }
}