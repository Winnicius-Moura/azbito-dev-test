import { DynamoProvider } from '@/shared/infrastructure/persistence/dynamo-provider'
import { DynamoDB } from 'aws-sdk'

const tables: DynamoDB.CreateTableInput[] = [
  {
    TableName: 'Users',
    AttributeDefinitions: [{ AttributeName: 'id', AttributeType: 'S' }],
    KeySchema: [{ AttributeName: 'id', KeyType: 'HASH' }],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5,
    },
  },
  {
    TableName: 'Establishments',
    AttributeDefinitions: [
      { AttributeName: 'id', AttributeType: 'S' },
      { AttributeName: 'ownerId', AttributeType: 'S' },
      { AttributeName: 'type', AttributeType: 'S' }
    ],
    GlobalSecondaryIndexes: [
      {
        IndexName: 'OwnerIndex',
        KeySchema: [{ AttributeName: 'ownerId', KeyType: 'HASH' }],
        Projection: { ProjectionType: 'ALL' },
        ProvisionedThroughput: { ReadCapacityUnits: 5, WriteCapacityUnits: 5 },
      },
      {
        IndexName: 'TypeIndex',
        KeySchema: [{ AttributeName: 'type', KeyType: 'HASH' }],
        Projection: { ProjectionType: 'ALL' },
        ProvisionedThroughput: { ReadCapacityUnits: 5, WriteCapacityUnits: 5 },
      }
    ],
    KeySchema: [{ AttributeName: 'id', KeyType: 'HASH' }],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5,
    },
  },
  {
    TableName: 'Products',
    AttributeDefinitions: [{ AttributeName: 'id', AttributeType: 'S' },],
    KeySchema: [{ AttributeName: 'id', KeyType: 'HASH' }],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5,
    },
  },
  {
    TableName: 'EstablishmentRules',
    AttributeDefinitions: [{ AttributeName: 'establishmentId', AttributeType: 'S' }],
    KeySchema: [{ AttributeName: 'establishmentId', KeyType: 'HASH' }],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5,
    },
  }
]

export async function initDatabase(): Promise<void> {
  try {
    const { TableNames: existingTables = [] } = await DynamoProvider.listTables();

    for (const table of tables) {
      if (existingTables.includes(table.TableName)) {
        console.log(`Tabela já existe: ${table.TableName}`)
        continue
      }

      await DynamoProvider.createTable(table);
      console.log(`Tabela criada: ${table.TableName}`)
    }

    console.log('Inicialização do banco finalizada.')
  } catch (err) {
    console.error('Erro ao inicializar o banco:', err)
    throw err
  }
}
