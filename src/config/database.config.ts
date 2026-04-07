import { registerAs } from '@nestjs/config';
import type { SequelizeModuleOptions } from '@nestjs/sequelize';

export default registerAs<SequelizeModuleOptions>('database', () => ({
  dialect: 'mysql' as const,
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'task_management',
  autoLoadModels: false,
  synchronize: process.env.NODE_ENV === 'development',
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  pool: {
    max: 10,
    min: 2,
    acquire: 30000,
    idle: 10000,
  },
}));
