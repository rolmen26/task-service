import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule, SequelizeModuleOptions } from '@nestjs/sequelize';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService): SequelizeModuleOptions => ({
        ...(configService.get<SequelizeModuleOptions>('database') ?? {}),
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [SequelizeModule],
})
export class DatabaseModule {}
