import { TypeOrmModuleOptions } from '@nestjs/typeorm';

/*
    TypeOrmModuleOptions interface tells us the options 
    that we can state when defining the configuration for the database connection.
*/
export const typeOrmConfig: TypeOrmModuleOptions = {
  // database type. Based on this type, tyorm will decide which driver to use.
  // eg. for 'postgres', typeorm will choose 'pg' driver for Node.js.
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '111111',
  database: 'taskmanagement',
  // typeorm uses entities that translate to tables in the database.
  // and these are saved in files. So we should tell typeorm which files these are.
  // Below line means any files in any folders (under src) ending with .entity.ts or .entity.js
  entities: [__dirname + '/../**/*.entity.{js,ts}'],

  // basically every time the connection starts, sync up with the schemas in the Postgres database.
  // For production, it should be set to false.
  synchronize: true,
};
