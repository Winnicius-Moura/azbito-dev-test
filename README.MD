# azbito-dev-test

## Descrição
Este projeto é uma aplicação de teste Node.js que utiliza TypeScript, Express, DynamoDb, Swagger e Docker.  

## Pré-requisitos
1. Certifique-se de ter o [Node.js](https://nodejs.org/) e o [Docker](https://www.docker.com/) instalados.  
2. Configure um arquivo `.env` apenas renomeando o arquivo .env.example com as variáveis necessárias para a aplicação de teste.  
3. Certifique-se de que o banco de dados DynamoDB está acessível no navegador `localhost:8001`.  

## Scripts disponíveis
Os seguintes scripts estão disponíveis no projeto:  

- **Instalar dependências:**  
  ```bash
  npm install
  ```

- **Iniciar o ambiente Docker para acessar o banco de desenvolvimento:**  
  ```bash
  npm run docker:dev
  ```

- **Iniciar a aplicação em modo de desenvolvimento:**  
  ```bash
  npm run dev
  ```

- **Executar os testes:**  
  ```bash
  npm run test
  ```

## Tecnologias utilizadas
- Node.js  
- TypeScript  
- Express  
- DynamoDB  
- Jest

- Swagger 
- Docker

## Licença
Este projeto está licenciado sob a licença ISC.  