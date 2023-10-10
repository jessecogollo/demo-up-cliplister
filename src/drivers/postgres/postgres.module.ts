import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import postgres from './postgres.provider';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [postgres],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get('postgres'),
    }),
  ],
})
export class PostgresConfigModule {}
