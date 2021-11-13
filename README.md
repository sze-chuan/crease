# Crease

## Description
Crease is built to tackle the pain points of tracking credit card rewards. Some of the main features include:
- Adding credit cards
- Adding transactions and computing the rewards based on each card's rewards' requirements
- Giving an overview of the rewards earned

This is also a personal side project to pick up the following concepts:
- Clean Architecture
- Domain Driven Design

## Tech stack
- React 17
- ASP.Net Core 5
- Entity Framework Core 5
- MediatR
- AutoMapper
- FluentValidation
- Cosmos DB

## Installation
### Prerequisites
Make sure the following is installed:

- .Net 5 SDK
- Node.js LTS

### Database Configuration
There are 2 types of database, in memory and Cosmos DB.

#### In Memory Database
To configure in memory database, go to `src/Crease.WebUI/appsettings.json` and set `UseInMemoryDatabase` to `true`.

#### Cosmos DB
To develop locally with Cosmos DB, perform the following steps:

1. Install and run [Azure Cosmos DB Emulator](https://aka.ms/cosmosdb-emulator).
2. Run the data explorer from Cosmos DB Emulator and copy the `Primary Connection String` in the home page.
3. Navigate to `src/Crease.WebUI` with terminal.
4. Execute the following command: `dotnet user-secrets set "ConnectionStrings:Crease" "<Primary Connection String>"`
5. Go to `src/Crease.WebUI/appsettings.json` and set `UseInMemoryDatabase` to `false`

### Running the web application:

1. Navigate to `src/Crease.WebUI/client-app` and run `yarn install`
2. Navigate to `src/Crease.WebUI/client-app` and run `yarn start` to run the front end client
3. Navigate to `src/Crease.WebUI` and run `dotnet run` to start the back end API services

