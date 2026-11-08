# DDD · Inventory domain in TypeScript

Personal practice from Rocketseat’s Node.js training. This repository includes an initial forum exercise and a later inventory domain. The inventory work is the best starting point for a technical review.

**Stack** · TypeScript, Node.js, Vitest.

| Start here | What it demonstrates |
| --- | --- |
| [Stock entity](src/domain/entities/stock.ts) and [unit tests](src/domain/entities/stock.spec.ts) | Business rules and state changes. |
| [Register product](src/domain/use-cases/register-product.ts) and [tests](src/domain/use-cases/register-product.spec.ts) | A use case separated from persistence by a repository contract. |
| [Slug value object](src/domain/entities/value-objects/slug.ts) and [tests](src/domain/entities/value-objects/slug.spec.ts) | Normalization and domain modeling. |

**Original contribution** · [Inventory entities and use cases](https://github.com/BrunoBDevOceanoAzul/DDD/commit/dfe36d23d9421cd15f5d0ae43f25865337f9f44c). See the upstream commit for authorship and the implementation diff.

## Run the tests

Use Node.js 22 and npm.

```sh
npm ci
npm test
```

## Em português

Exercício pessoal da formação Node.js da Rocketseat. Comece pela entidade de estoque e pelos casos de uso para avaliar regras de domínio, interfaces de repositório e testes unitários.
