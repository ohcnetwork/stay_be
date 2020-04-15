import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';
import * as fs from 'fs';
const dbConfig = config.get('db');

export const DbConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: dbConfig.host || process.env.DBHOST,
  port: dbConfig.port || process.env.PORT,
  username: dbConfig.username || process.env.USERNAME,
  password: dbConfig.password || process.env.PASSWORD ,
  database: dbConfig.database || process.env.DATABASE,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  migrations: [__dirname + '/../**/migrations/*{.ts,.js}'],
  synchronize: false,
  migrationsRun: true,
  ssl: {
    ca: fs.readFileSync(__dirname + '/rds-ca-2019-root.pem')
  },
  // logging: ["query", "error"],
  cli: {
    migrationsDir: 'migrations',
  },
};
