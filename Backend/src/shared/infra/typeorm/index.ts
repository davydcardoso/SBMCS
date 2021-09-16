import { createConnections, createConnection } from 'typeorm';


createConnection({
    name: "Postgres",
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'teste123',
    database: 'SBMCS',
    synchronize: true,
    logging: false,
    entities: [
        "./src/modules/**/infra/typeorm/entities/*.ts"
    ],
    migrations: [
        "./src/shared/infra/typeorm/migrations/*.ts"
    ],
    cli: {
        "migrationsDir": "./src/shared/infra/typeorm/migrations"
    }
});
