import { DataSource, DataSourceOptions } from 'typeorm';
import { registerAs } from '@nestjs/config';
import * as dotenv from 'dotenv';

import { Assets } from '../../domains/assets/assets.entity';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: 'local.env' });
}

const config = {
  type: 'postgres',
  url: process.env.POSTGRES_CONNECTION_STRING,
  entities: [Assets],
  synchronize: false,
  migrationsRun: false,
  migrationsTableName: 'migrations',
  migrations: ['src/drivers/postgres/migrations/*{.ts,.js}'],
};

export default registerAs('postgres', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);
