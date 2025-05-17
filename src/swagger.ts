import swaggerJSDoc from 'swagger-jsdoc';

export const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: '🧪 Teste Técnico – Backend Developer',
      version: '1.0.0',
    },
    components: {
      schemas: {
        User: {
          type: 'object',
          properties: {
            name: { type: 'string', example: 'João da Silva' },
            email: { type: 'string', example: 'joao@email.com' },
            type: { type: 'string', enum: ['customer', 'owner'], example: 'owner' },
          },
        },
        Product: {
          type: 'object',
          properties: {
            name: { type: 'string', example: 'Produto Exemplo' },
            establishmentId: { type: 'string', example: 'ed749862-665d-4db5-8e54-663b450f1914' },
            price: { type: 'number', example: 99.99 },
          },
        },
        Establishment: {
          type: 'object',
          properties: {
            name: { type: 'string', example: 'Estabelecimento Exemplo' },
            ownerId: { type: 'string', example: 'ed749862-665d-4db5-8e54-663b450f1914' },
            type: { type: 'string', enum: ['shopping', 'local'], example: 'local' },
          },
        },
        EstablishmentRules: {
          type: 'object',
          properties: {
            establishmentId: { type: 'string', example: 'ed749862-665d-4db5-8e54-663b450f1914' },
            picturesLimit: { type: 'string', example: 10 },
            videoLimit: { type: 'string', example: 10 },
          },
        },
      },
    },
  },
  apis: ['./src/config/routes/*.ts'],
});
