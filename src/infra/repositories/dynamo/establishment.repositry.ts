import { EstablishmentEntity } from '@/domain/models/establishment.entity';
import { EstablishmentRepository } from '@/domain/repositories/establishment.repository';
import { DynamoService } from '@/shared/infrastructure/persistence/dynamo.service';

export class DynamoEstablishmentRepository implements EstablishmentRepository.Repository<EstablishmentEntity> {
  private readonly tableName = 'Establishments';

  constructor(private readonly dynamoService: DynamoService) { }

  async save(establishment: EstablishmentEntity): Promise<EstablishmentEntity> {
    await this.dynamoService.client.put({
      TableName: this.tableName,
      Item: this.toPersistence(establishment),
    }).promise();

    return establishment
  }

  async findById(id: string): Promise<EstablishmentEntity | null> {
    const result = await this.dynamoService.client.get({
      TableName: this.tableName,
      Key: { id },
    }).promise();

    if (!result.Item) {
      return null;
    }

    return this.mapToEntity(result.Item);
  }

  async update(entity: EstablishmentEntity): Promise<EstablishmentEntity> {
    const updatedAt = new Date()

    const params = {
      TableName: this.tableName,
      Key: { id: entity.id },
      UpdateExpression: 'SET #name = :name, #ownerId = :ownerId, #type = :type, #updatedAt = :updatedAt',
      ConditionExpression: 'attribute_exists(id)',
      ExpressionAttributeNames: {
        '#name': 'name',
        '#ownerId': 'ownerId',
        '#type': 'type',
        '#updatedAt': 'updatedAt'
      },
      ExpressionAttributeValues: {
        ':name': entity.props.name,
        ':ownerId': entity.props.ownerId,
        ':type': entity.props.type,
        ':updatedAt': updatedAt.toISOString()
      },
      ReturnValues: 'ALL_NEW'
    }

    try {
      const result = await this.dynamoService.client.update(params).promise()
      return this.mapToEntity(result.Attributes)
    } catch (error) {
      console.error('Error updating user:', error)
      throw error
    }
  }

  async findAll(): Promise<EstablishmentEntity[]> {
    const result = await this.dynamoService.client.scan({
      TableName: this.tableName,
    }).promise()
    if (!result.Items) {
      return []
    }

    return result.Items.map((item) => this.mapToEntity(item))
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
        throw new Error(`Establishmen with id ${id} does not exist`);
      }
      throw error;
    }

  }

  private toPersistence(entity: EstablishmentEntity): Record<string, any> {
    return {
      id: entity.id,
      name: entity.props.name,
      ownerId: entity.props.ownerId,
      type: entity.props.type,
      createdAt: entity.props.createdAt?.toISOString() ?? new Date().toISOString(),
      updatedAt: entity.props.updatedAt?.toISOString(),
    }
  }

  private mapToEntity(item: any): EstablishmentEntity {
    return new EstablishmentEntity({
      name: item.name,
      ownerId: item.ownerId,
      type: item.type,
      createdAt: new Date(item.createdAt),
      updatedAt: item.updatedAt ? new Date(item.updatedAt) : undefined,
    }, item.id);
  }
}
