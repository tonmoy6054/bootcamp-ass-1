# bcpro-1

## Description

This is a TypeScript project for managing orders and products with Express and MongoDB. The project uses Zod for validation, Mongoose for database interactions, and includes various scripts for development and production.

## Requirements

- Node.js (version 14.x or higher)
- MongoDB

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/tonmoy6054/bootcamp-ass-1.git
cd bcpro-1


Install Dependencies

npm install


You can use the following scripts to run the project:

Development Mode: This will start the server with hot-reloading using tsx.

npm run dev

Build: Compile the TypeScript code to JavaScript.

npm run build


src/
  ├── app/
  │   ├── modules/
  │   │   ├── order/
  │   │   │   ├── order.controller.ts
  │   │   │   ├── order.service.ts
  │   │   │   ├── order.model.ts
  │   │   │   └── order.validation.ts
  │   │   └── product/
  │   │       ├── product.controller.ts
  │   │       ├── product.service.ts
  │   │       ├── product.model.ts
  │   │       └── product.validation.ts
  ├── server.ts
  └── config/
      └── index.ts
```
