import { EstablishmentEntity, EstablishmentProps } from '@/domain/models/establishment.entity'
import { UserEntity } from '@/domain/models/user.entity'
import { UserRepository } from '@/domain/repositories/user.repository'
import { EstablishmentRepository } from '@/domain/repositories/establishment.repository'
import { EstablishmentType, UserType } from '@/shared/utils/types'

export class CreateEstablishmentUseCase {
  constructor(
    private readonly userRepository: UserRepository.Repository<UserEntity>,
    private readonly establishmentRepository: EstablishmentRepository.Repository<EstablishmentEntity>
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
