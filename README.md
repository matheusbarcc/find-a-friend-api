# Find A Friend API

API para adoção de animais utilizando Node, Fastify, Prisma e Vitest

## Regras da aplicação

- [x] Deve ser possível se cadastrar como uma ORG
- [x] Deve ser possível cadastrar um pet
- [x] Deve ser possível realizar login como uma ORG
- [ ] Deve ser possível visualizar detalhes de um pet para adoção
- [ ] Deve ser possível listar todos os pets disponíveis para adoção em uma cidade
- [ ] Deve ser possível filtrar pets por suas características

## Regras de negócio

- [ ] Para listar os pets, obrigatoriamente precisamos informar a cidade
- [x] Uma ORG precisa ter um endereço e um número de WhatsApp
- [x] Um pet deve estar ligado a uma ORG
- [ ] O usuário que quer adotar, entrará em contato com a ORG via WhatsApp
- [ ] Todos os filtros, além da cidade, são opcionais
- [ ] Para uma ORG acessar a aplicação como admin, ela precisa estar logada