import { DynamoDB } from 'aws-sdk'
import dotenv from 'dotenv'

dotenv.config()

export class DynamoService {
  private readonly dynamoDB: DynamoDB
  private readonly documentClient: DynamoDB.DocumentClient

  constructor() {
    this.dynamoDB = new DynamoDB({
      region: process.env.AWS_REGION,
      endpoint: process.env.DYNAMODB_ENDPOINT,
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    })

    this.documentClient = new DynamoDB.DocumentClient({
      service: this.dynamoDB
    })
  }

  get client(): DynamoDB.DocumentClient {
    return this.documentClient
  }

  get db(): DynamoDB {
    return this.dynamoDB
  }
}