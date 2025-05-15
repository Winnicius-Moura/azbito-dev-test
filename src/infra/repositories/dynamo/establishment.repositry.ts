import { EstablishmentEntity } from '@/domain/models/establishment.entity';
import { DynamoService } from '@/shared/infrastructure/persistence/dynamo.service';
import { RepositoryInterface } from '@/shared/repositories/repository-contracts';

export class DynamoEstablishmentRepository implements RepositoryInterface<EstablishmentEntity> {
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
