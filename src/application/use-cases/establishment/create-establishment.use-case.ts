import { EstablishmentEntity, EstablishmentProps } from '@/domain/models/establishment.entity';
import { UserEntity } from '@/domain/models/user.entity';
import { UserRepository } from '@/domain/repositories/user.repository';
import { RepositoryInterface } from '@/shared/repositories/repository-contracts';
import { EstablishmentType, UserType } from '@/shared/utils/types';

export class CreateEstablishmentUseCase {
  constructor(
    private readonly userRepository: UserRepository.Repository<UserEntity>,
    private readonly establishmentRepository: RepositoryInterface<EstablishmentEntity>
  ) { }

  async execute(input: EstablishmentProps): Promise<EstablishmentEntity> {
    const owner = await this.userRepository.findById(input.ownerId);
    if (!owner) {
      throw new Error('Owner user not found.');
    }

    if (owner.props.type !== UserType.OWNER) {
      throw new Error('Only users with type "owner" can create establishments.');
    }

    const establishment = new EstablishmentEntity({
      name: input.name,
      ownerId: input.ownerId,
      type: input.type as EstablishmentType,
    },);

    return await this.establishmentRepository.save(establishment);

  }
}

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
