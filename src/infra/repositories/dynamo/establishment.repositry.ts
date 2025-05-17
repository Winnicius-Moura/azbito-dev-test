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

  async update(product: EstablishmentEntity): Promise<EstablishmentEntity> {
      return this.save(product); 
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

  async findByType(type: string): Promise<EstablishmentEntity[]> {
    const result = await this.dynamoService.client.scan({
      TableName: this.tableName,
      FilterExpression: '#type = :type',
      ExpressionAttributeNames: { '#type': 'type' },
      ExpressionAttributeValues: { ':type': type },
    }).promise()

    return (result.Items || []).map(this.mapToEntity)
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
      createdAt: entity.props.createdAt,
      updatedAt: entity.props.updatedAt,
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
