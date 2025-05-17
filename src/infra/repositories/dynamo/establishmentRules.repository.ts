import { EstablishmentRulesEntity, EstablishmentRulesProps } from '@/domain/models/establishmentRules.entity';
import { EstablishmentRulesRepository } from '@/domain/repositories/establishmentRules.repository';
import { DynamoService } from '@/shared/infrastructure/persistence/dynamo.service';

export class DynamoEstablishmentRulesRepository implements EstablishmentRulesRepository.Repository<EstablishmentRulesEntity> {
  private readonly tableName = 'EstablishmentRules';

  constructor(private readonly dynamoService: DynamoService) { }

  async findByEstablishmentId(establishmentId: string): Promise<EstablishmentRulesEntity | null> {
    const result = await this.dynamoService.client.scan({
      TableName: this.tableName,
      FilterExpression: '#establishmentId = :establishmentId',
      ExpressionAttributeNames: {
        '#establishmentId': 'establishmentId',
      },
      ExpressionAttributeValues: {
        ':establishmentId': establishmentId,
      },
    }).promise();

    if (!result.Items || result.Items.length === 0) return null;

    const rule = result.Items[0];

    return new EstablishmentRulesEntity({
      establishmentId: rule.establishmentId,
      picturesLimit: rule.picturesLimit,
      videoLimit: rule.videoLimit,
    }, rule.id);
  }

  async save(rule: EstablishmentRulesEntity): Promise<EstablishmentRulesEntity> {
    await this.dynamoService.client.put({
      TableName: this.tableName,
      Item: this.toPersistence(rule),
    }).promise();

    return rule;
  }

  async update(rule: EstablishmentRulesEntity): Promise<EstablishmentRulesEntity> {
    return this.save(rule);
  }

  async delete(id: string): Promise<void> {
    await this.dynamoService.client.delete({
      TableName: this.tableName,
      Key: { id },
    }).promise();
  }

  private toPersistence(entity: EstablishmentRulesEntity): EstablishmentRulesProps {
    return {
      id: entity.id,
      establishmentId: entity.props.establishmentId,
      picturesLimit: entity.props.picturesLimit,
      videoLimit: entity.props.videoLimit,
      createdAt: entity.props.createdAt?.toISOString(),
      updatedAt: entity.props.updatedAt ? new Date(entity.props.updatedAt) : undefined,
    } as EstablishmentRulesProps
  }
}
