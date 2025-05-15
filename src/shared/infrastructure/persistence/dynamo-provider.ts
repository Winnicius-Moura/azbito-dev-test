import { DynamoEstablishmentRepository } from '@/infra/repositories/dynamo/establishment.repositry'
import { DynamoUserRepository } from '@/infra/repositories/dynamo/user.repository'
import { DynamoService } from '@/shared/infrastructure/persistence/dynamo.service'
import { DynamoDB } from 'aws-sdk'

export class DynamoProvider {
  private static dynamoService: DynamoService

  static getService(): DynamoService {
    if (!this.dynamoService) {
      this.dynamoService = new DynamoService()
    }
    return this.dynamoService
  }

  static async listTables(): Promise<DynamoDB.ListTablesOutput> {
    const service = this.getService()
    return service.db.listTables().promise()
  }

  static async createTable(params: DynamoDB.CreateTableInput): Promise<void> {
    const service = this.getService()
    await service.db.createTable(params).promise()
  }

  static getUserRepository(): DynamoUserRepository {
    return new DynamoUserRepository(this.getService())
  }

  static getEstablishmentRepository(): DynamoEstablishmentRepository {
    return new DynamoEstablishmentRepository(this.getService());
  }
}