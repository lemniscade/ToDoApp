import { DataSource } from 'typeorm';
import { join } from 'path';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || 'root',
  database: process.env.DB_NAME || 'todoappdb',
  entities: [join(__dirname, '../entities/*.entity.ts')],
  migrations: [join(__dirname, '../migrations/*.ts')],
  synchronize: false,
});
