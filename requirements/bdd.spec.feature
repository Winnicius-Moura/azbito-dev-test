Este documento descreve os comportamentos esperados da aplicação com base no teste técnico, no formato BDD. Cada funcionalidade é expressa como uma Feature com seus respectivos Scenarios.


Feature: Gerenciar Usuários

**Como** um administrador da plataforma
**Quero** poder cadastrar , buscar , listar, atualizar e excluir usuários ✅
**Para que** eu tenha controle sobre quem usa o sistema

Scenario: Criar usuário com sucesso

Given que o payload enviado contém name, email e type válidos ✅
When o endpoint POST /users é chamado
Then um usuário é criado com ID e dados retornados ✅

Scenario: Não permitir tipo inválido

Given que o campo "type" é diferente de "owner" ou "customer" ✅
When o endpoint POST /users é chamado
Then deve retornar erro 400 com mensagem de tipo inválido ✅

Feature: Criar Estabelecimento

**Como** um usuário do tipo "owner"
**Quero** cadastrar estabelecimentos ✅
**Para que** eu possa vender meus produtos

Scenario: Criar estabelecimento com sucesso

Given que o owner já está cadastrado com type = "owner"
And envia os dados name e type (shopping/local)
When o endpoint POST /establishments é chamado
Then o estabelecimento é criado com ownerId associado ✅

Scenario: Impedir criação por customer

Given que o user é do tipo "customer"
When ele tenta criar um estabelecimento
Then deve retornar erro de permissão ✅

Feature: Cadastro de Produtos

**Como** um dono de estabelecimento
**Quero** adicionar produtos no meu local
**Para que** meus clientes possam visualizá-los

Scenario: Criar produto com sucesso

Given que um estabelecimento existe
And ele possui regras configuradas (EstablishmentRules)
When um produto é enviado com name, price e establishmentId
Then o produto é criado com sucesso

Scenario: Criar produto sem regras

Given que um estabelecimento existe
And ele não possui regras configuradas
When tenta criar produto
Then deve retornar erro de regra não encontrada

Feature: Cadastro de Regras de Estabelecimento

**Como** um administrador ou dono de estabelecimento
**Quero** configurar limites de fotos e víeos
**Para que** os produtos respeitem essas regras

Scenario: Criar regras com sucesso

Given que um estabelecimento já existe
When envio establishmentId, picturesLimit e videoLimit
Then a regra é salva para o estabelecimento

Scenario: Atualizar regras

Given que a regra já existe
When envio novos valores para limits
Then os valores são atualizados corretamente

Scenario: Deletar regra

Given que uma regra existe
When o endpoint DELETE /rules/:id é chamado
Then a regra é removida do banco