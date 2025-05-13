import { DynamoDB } from 'aws-sdk'
import dotenv from 'dotenv'

dotenv.config()

export const db = new DynamoDB({
  region: process.env.AWS_REGION,
  endpoint: process.env.DYNAMODB_ENDPOINT,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
})