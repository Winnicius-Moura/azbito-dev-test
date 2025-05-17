import { UserEntity, UserProps } from "@/domain/models/user.entity"
import { UserRepository } from "@/domain/repositories/user.repository"
import { DynamoService } from "@/shared/infrastructure/persistence/dynamo.service"

export class DynamoUserRepository implements UserRepository.Repository<UserEntity> {
  private readonly tableName = 'Users'
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

  async update(product: UserEntity): Promise<UserEntity> {
    return this.save(product);
  }

  async findAll(): Promise<UserEntity[]> {
    const result = await this.dynamoService.client.scan({
      TableName: this.tableName
    }).promise()

    if (!result.Items) {
      return []
    }

    return result.Items?.map((item) => this.mapToEntity(item))
  }

  async delete(id: string): Promise<void> {
    try {
      await this.dynamoService.client.delete({
        TableName: this.tableName,
        Key: { id },
        ConditionExpression: 'attribute_exists(id)',
      }).promise()
    } catch (error) {
      if ((error as any).code === 'ConditionalCheckFailedException') {
        throw new Error(`User with id ${id} does not exist`);
      }
      throw error;
    }

  }

  private mapToEntity(item: any): UserEntity {
    const entity = new UserEntity(item, item.id)
    return entity
  }

  private toPersistence(user: UserEntity): UserProps {
    return {
      id: user.id,
      name: user.props.name,
      email: user.props.email,
      type: user.props.type,
      createdAt: user.props.createdAt ?? new Date(),
      updatedAt: user.props.updatedAt ? new Date(user.props.updatedAt) : undefined,
    } as UserProps
  }
}