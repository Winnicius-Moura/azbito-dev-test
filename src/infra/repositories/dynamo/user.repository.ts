import { UserEntity, UserProps } from "@/domain/models/user.entity";
import { UserRepository } from "@/domain/repositories/user.repository";
import { DynamoService } from "@/shared/infrastructure/persistence/dynamo.service";

export class DynamoUserRepository implements UserRepository.Repository<UserEntity> {
  private readonly tableName = 'Users';
  constructor(private readonly dynamoService: DynamoService) { }

  async save(user: UserEntity): Promise<UserEntity> {
    await this.dynamoService.client.put({
      TableName: this.tableName,
      Item: this.toPersistence(user),
    }).promise()
    
    return user
  }

  async findById(id: string): Promise<UserEntity | null> {
    const result = await this.dynamoService.client.get({
      TableName: this.tableName,
      Key: { id },
    }).promise()

    if (!result.Item) {
      return null
    }

    return this.mapToEntity(result.Item)
  }

  private mapToEntity(item: any): UserEntity {
    return new UserEntity({
      name: item.name,
      email: item.email,
      type: item.type,
      createdAt: new Date(item.createdAt),
      updatedAt: item.updatedAt ? new Date(item.updatedAt) : undefined,
    }, item.id);
  }

  private toPersistence(user: UserEntity): UserProps {
    return {
      id: user.id,
      name: user.props.name,
      email: user.props.email,
      type: user.props.type,
      createdAt: user.props.createdAt?.toISOString(),
      updatedAt: user.props.updatedAt ? new Date(user.props.updatedAt) : undefined,
    } as UserProps;
  }
}