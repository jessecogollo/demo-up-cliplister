import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

import { Assets } from '../../src/domains/assets/assets.entity';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: 'local.env' });
}

let connectionInstance: DataSource;

export default async function initializeDatasource(): Promise<DataSource> {
  const config = {
    type: 'postgres',
    url: process.env.POSTGRES_CONNECTION_STRING,
    entities: [Assets],
    synchronize: true,
    migrationsRun: true,
    migrationsTableName: 'migrations',
    migrations: ['src/drivers/postgres/migrations/*{.ts,.js}'],
  };
  const dataSource = new DataSource(config as DataSourceOptions);

  try {
    if (!connectionInstance) {
      connectionInstance = await dataSource.initialize();
    }

    return connectionInstance;
  } catch (err) {
    throw new Error('Something went wrong openning connection to the database');
  }
}
