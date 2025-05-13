import { db } from '@/config/dynamodb'

const tables = [
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
    const existing = await db.listTables().promise()
    const existingTables = existing.TableNames || []

    for (const table of tables) {
      if (existingTables.includes(table.TableName)) {
        console.log(`Tabela já existe: ${table.TableName}`)
        continue
      }

      await db.createTable(table).promise()
      console.log(`Tabela criada: ${table.TableName}`)
    }

    console.log('Inicialização do banco finalizada.')
  } catch (err) {
    console.error('Erro ao inicializar o banco:', err)
    throw err
  }
}
