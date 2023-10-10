## Description

repository for DemoUp code challenge backend applications using [NestJS](https://docs.nestjs.com/).

### How to use this

In order to run migrations andrun the application you need to install globally `typeorm` and `nest-cli`

We hightly recommend to check the following lectures in order to onboard to the template and apply best practices.

- [NestJS overview](https://docs.nestjs.com/first-steps)
- [TypeORM tips](https://www.darraghoriordan.com/2022/06/13/persistence-7-typeorm-postgres-9-tips-tricks-issues)

## Project structure

The implementation of the scaffold implements the [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) pattern which is a domain oriented.
An important goal of clean architecture is to provide developers with a way to organize code in such a way that it encapsulates the business logic but keeps it separate from the delivery mechanism, such as the user interface, database, or APIs. This separation of concerns makes the system easier to understand, maintain, and extend.

By adhering to the main rule that code dependencies can only move from the outer levels inward, Clean Architecture ensures that code on the inner layers remains pristine and untouched by the often-volatile changes that happen in the outer layers. This unidirectional flow of dependencies keeps the system's core stable and resilient, encapsulating what the system 'is' separately from how it 'acts' in a given context.

### Benefits of the pattern

1. _Maintainability_: By isolating the business logic and other responsibilities into separate layers, the codebase becomes easier to manage. If something needs to be changed in one layer, it is less likely to affect other parts of the system.

2. _Testability_: Because the inner layers are isolated from the external dependencies, writing unit tests becomes straightforward. You can test the business logic without worrying about the database, UI, or any external APIs.

3. _Reusability_: Clean Architecture makes it simpler to reuse code across different projects or parts of the same project. Since business logic is decoupled from the delivery mechanism, you can plug it into different systems without significant changes.

4. _Interchangeability_: By adhering to the principle that code dependencies can only move from the outer levels inward, you enable a plug-and-play approach. You can easily replace or upgrade specific components without disturbing the core business logic.

5. _Scalability_: The modular structure makes it easier to scale the application. You can focus on enhancing or scaling specific layers independently from others.

6. _Faster Onboarding_: New developers can more quickly understand the codebase, as the architecture lays out a clear roadmap of how data flows through the system and where core functionalities reside.

Therefore, the `demo-up-clplister` uses the following structure.

```bash
|-src
|-- domains
|--- assets // Name of the domain
|---- *.entity.ts // All entities that are mapped to the database should be name with the `.entity.ts`
|---- *.module.ts // Nest module
|---- *.service.ts // Business cases that are applied to the entities of the domain.
|---- *.service.spec.ts // Unit test for the services.
|---- *.types.ts // Addtional types can be placed here, such as DTOs, value objects, interfaces, and so on.
|
|-- drivers
|--- http // HTTP driver that exposes the controllers of the HTTP server
|---- assets // Same as domains the http controllers are group by domain name
|----- *.controller.ts // HTTP services
|----- *.controller.spec.ts // Unit tests for controllers
|
|--- postgres // Name of the domain
|---- migrations // Folder that holds the migrations
|---- postgres.module.ts // NestJS module.
|---- postgres.provider.ts // NestJS provider that exposes the connection to the postgres database.
|
|-- app.module.ts // Main module which is used to inject all the dependencies of the project.
|-- main.ts // Entry point of the application.
|
|- tests
|-- utils
|--- fixtures.ts // Exposes a set of entities that can be created for test purposes.
|--- seeder.ts // Set of functions that seeds the database for e2e tests.
|--- postgresDatasource.ts // Exposes the datasources to be used in the e2e tests.
|
|-- *.e2e-spec.ts // Definition of the e2e tests.
|
```

### Installation

```bash
# Install NestJS CLI
$ npm install -g @nestjs/cli

# Install typeorm CLI
$ npm install -g typeorm

# Install pnpm
$ npm install -g pnpm

# Install project dependencies
$ pnpm install
```

### Running the app

```bash
# Development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

### Tests

```bash
# Unit tests
$ pnpm test:unit

# e2e tests
# Important to have running the dependencies of the project `docker-compose up -d`
$ pnpm run test:e2e

# Running all tests
$ pnpm test
```

### Migrations

```bash
## Create migration
$ typeorm migration:create ./src/drivers/postgres/migrations/addAssetsTable -o

## Run migrations
$ pnpm migrations:up

## Rollback migrations
$ pnpm migrations:down
```

### swagger

```
http://localhost:3000/api
```

### NestJS Useful commands

The Nest CLI is a command-line interface tool that helps you to initialize, develop, and maintain your Nest applications. It assists in multiple ways, including scaffolding the project, serving it in development mode, and building and bundling the application for production distribution. It embodies best-practice architectural patterns to encourage well-structured apps.

Some of the useful commands are

```bash
$ nest g module /domain/<domainName> // Generates the module that holds the entities, and services.
$ nest g service /domains/<domainName> // Generates a service.
$ nest g controller /drivers/http/<domainName> // Generates a controller.
```
