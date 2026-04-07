const databaseConfig = {
  development: {
    dialect: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || 'task_management',
    autoLoadModels: true,
    synchronize: true,
    logging: console.log,
    pool: {
      max: 10,
      min: 2,
      acquire: 30000,
      idle: 10000,
    },
  },
  production: {
    dialect: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || 'task_management',
    autoLoadModels: false,
    synchronize: false,
    logging: false,
    pool: {
      max: 10,
      min: 2,
      acquire: 30000,
      idle: 10000,
    },
  },
  test: {
    dialect: 'sqlite',
    storage: ':memory:',
    autoLoadModels: true,
    synchronize: true,
    logging: false,
  },
};

module.exports = databaseConfig;
