import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';

const dbConfig = config.get('db');

/*
    TypeOrmModuleOptions interface tells us the options 
    that we can state when defining the configuration for the database connection.
*/
export const typeOrmConfig: TypeOrmModuleOptions = {
  // database type. Based on this type, tyorm will decide which driver to use.
  // eg. for 'postgres', typeorm will choose 'pg' driver for Node.js.
  type: dbConfig.type,
  /*
    Here we are using RDS environment variables.
    RDS stands for relational database service. 
    It's a service in Amazon Web Services and that is the service I'm going to use as a database for PRODUCTION.
    We need to use the exact same names for env variables as given below 
    because when we deploy our application, Amazon is going to inject those variables.
    So it's important that we use exactly the same names.
    So if we don't get these env variables, we fall back to file based configuration.
  */
  host: process.env.RDS_HOSTNAME || dbConfig.host,
  port: process.env.RDS_PORT || dbConfig.port,
  username: process.env.RDS_USERNAME || dbConfig.username,
  password: process.env.RDS_PASSWORD || dbConfig.password,
  database: process.env.RDS_DB_NAME || dbConfig.database,

  // typeorm uses entities that translate to tables in the database.
  // and these are saved in files. So we should tell typeorm which files these are.
  // Below line means any files in any folders (under src) ending with .entity.ts or .entity.js
  entities: [__dirname + '/../**/*.entity.{js,ts}'],

  /*
    Basically every time the connection starts, sync up with the schemas in the Postgres database.
    Synchronize sets to true is a good idea in development because you constantly 
    change your typeorm configurations and then we can synchronize with your schemas in your database,
    make the necessary changes in the relations and so on.

    For production, it should be set to false. We are not going to setup DB (create tables, etc) beforehand 
    deploying our app in production then always set synchronize to false.
    But if we want our application to create DB objects like tables we go through the app, then
    for the first time deployment, we can set it to 'true' and then redeploy by setting it to 'false'.
  */
  synchronize: process.env.TYPEORM_SYNC || dbConfig.synchronize,
};
