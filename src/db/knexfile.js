import { debug } from "console";
import {config} from "dotenv";
import {Model} from "objection";
config({path : '../../.env'})

const knexConfig = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST||"localhost",
      user: process.env.DB_USER||"postgres",
      password: String(process.env.DB_PASSWORD)||"20051210Dskuz2*",
      database: process.env.DB_NAME||"postgres",
      port: process.env.DB_PORT||"5432",
    },
    migrations: {
      directory: './migrations',
    },
    debug:true
  },
};

export function setupDB(){
  const db = knex(knexConfig)
  Model.knex(db);
}

export default knexConfig;