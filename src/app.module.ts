import { Module } from '@nestjs/common';

import { PostgresConfigModule } from './drivers/postgres/postgres.module';

import { AssetsModule } from './domains/assets/assets.module';
import { AssetsController } from './drivers/http/assets/assets.controller';

@Module({
  imports: [PostgresConfigModule, AssetsModule],
  controllers: [AssetsController],
})
export class AppModule {}
