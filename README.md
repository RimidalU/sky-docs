# Awesome Project Build with TypeORM

Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `data-source.ts` file
3. Run `npm start` command

# migration
npx typeorm migration:create src/db/migrations/Init
npx typeorm migration:run

