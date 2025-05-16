import { ProductEntity } from '@/domain/models/product.entity';
import { ProductRepository } from '@/domain/repositories/product.repository';
import { DynamoService } from '@/shared/infrastructure/persistence/dynamo.service';

export class DynamoProductRepository implements ProductRepository.Repository<ProductEntity> {
  private readonly tableName = 'Products';

  constructor(private readonly dynamoService: DynamoService) { }

  async save(product: ProductEntity): Promise<ProductEntity> {
    await this.dynamoService.client.put({
      TableName: this.tableName,
      Item: this.toPersistence(product),
    }).promise();

    return product;
  }

  async findById(id: string): Promise<ProductEntity | null> {
    const result = await this.dynamoService.client.get({
      TableName: this.tableName,
      Key: { id },
    }).promise();

    if (!result.Item) return null;
    return this.mapToEntity(result.Item);
  }

  async update(product: ProductEntity): Promise<ProductEntity> {
    return this.save(product); 
  }

  async delete(id: string): Promise<void> {
    await this.dynamoService.client.delete({
      TableName: this.tableName,
      Key: { id },
    }).promise();
  }

  async findAll(): Promise<ProductEntity[]> {
    const result = await this.dynamoService.client.scan({
      TableName: this.tableName,
    }).promise();

    return (result.Items || []).map(this.mapToEntity);
  }

  private toPersistence(entity: ProductEntity): Record<string, any> {
    return {
      id: entity.id,
      name: entity.props.name,
      price: entity.props.price,
      establishmentId: entity.props.establishmentId,
      createdAt: entity.props.createdAt?.toISOString() ?? new Date().toISOString(),
      updatedAt: entity.props.updatedAt?.toISOString(),
    };
  }

  private mapToEntity(data: any): ProductEntity {
    return new ProductEntity({
      name: data.name,
      price: data.price,
      establishmentId: data.establishmentId,
      createdAt: new Date(data.createdAt),
      updatedAt: data.updatedAt ? new Date(data.updatedAt) : undefined,
    }, data.id);
  }
}
