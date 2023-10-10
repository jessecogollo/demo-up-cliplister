import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PostgresConfigModule } from '../../drivers/postgres/postgres.module';
import { Assets } from './assets.entity';
import { AssetsService } from './assets.service';

@Module({
  imports: [PostgresConfigModule, TypeOrmModule.forFeature([Assets])],
  exports: [TypeOrmModule, AssetsService],
  providers: [AssetsService],
})
export class AssetsModule {}
