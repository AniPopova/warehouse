import { DataSource, DataSourceOptions } from "typeorm";
import * as dotenv from 'dotenv';
import { jwtConstants } from "src/auth/jwt.constants";
dotenv.config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || '123',
  database: process.env.DB_DATABASE || 'warehouse2',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/db/migrations/*.js'],
  synchronize: false
};

export const JWT_SECRET = jwtConstants;

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
