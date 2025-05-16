import { UserEntity, UserProps } from "@/domain/models/user.entity"
import { UserRepository } from "@/domain/repositories/user.repository"
import { UserType } from "@/shared/utils/types"

export class UpdateUserUseCase {
  constructor(private readonly repository: UserRepository.Repository<UserEntity>) { }

  async execute(id: string, input: UserProps): Promise<UserEntity> {
    const response = await this.repository.findById(id);
    if (!response) {
      throw new Error('User not found');
    }

    response.update({
      name: input.name,
      email: input.email,
      type: input.type ? UserType.validate(input.type) : response.props.type,
    });

    return this.repository.update(response)
  }
}