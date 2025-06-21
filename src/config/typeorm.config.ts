import 'dotenv/config';
import { DataSourceOptions } from 'typeorm';

const isCompiled = __dirname.includes('dist');

const commonConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [isCompiled ? 'dist/**/*.entity.js' : 'src/**/*.entity.ts'],
  migrations: [isCompiled ? 'dist/migrations/*.js' : 'src/migrations/*.ts'],
  logging: process.env.APP_ENV === 'dev', // Print query statement to terminal.
};

// For data source config.
export const typeOrmConfig: DataSourceOptions = {
  ...commonConfig,
  synchronize: false, // If it is true, it will create/update data schema automatically. (Use only dev!)
};

// For setting config in app.module.ts.
export const typeOrmConfigForRoot = () => ({
  ...commonConfig,
  // synchronize: process.env.APP_ENV === 'dev', // If it is true, it will create/update data schema automatically. (Use only dev!)
  synchronize: false,
});
