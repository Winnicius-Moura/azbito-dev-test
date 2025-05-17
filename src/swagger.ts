import swaggerJSDoc from 'swagger-jsdoc';

export const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Usuários',
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
      },
    },
  },
  apis: ['./src/config/routes/*.ts'],
});
