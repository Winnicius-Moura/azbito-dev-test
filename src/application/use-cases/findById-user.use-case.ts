import { UserRepository } from '@/domain/repositories/user.repository'
import { UserEntity } from '@/domain/models/user.entity'

export class FindUserByIdUseCase {
  constructor(private readonly repository: UserRepository.Repository<UserEntity>) { }

  async execute(id: string): Promise<UserEntity | null> {
    try {
      return await this.repository.findById(id);
    } catch (error) {
      console.error('Error in FindUserByIdUseCase:', error);
      throw error;
    }
  }
}
