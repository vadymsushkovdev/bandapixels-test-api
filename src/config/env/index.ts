import dotenv from 'dotenv';
import IDBConfig from './interfaces/interface';

dotenv.config();

const NODE_ENV: string = process.env.NODE_ENV || 'development';

const development: IDBConfig = {
    port: process.env.PORT,
    database: {
        MONGODB_URI: process.env.MONGODB_URI,
        MONGODB_DB_MAIN: process.env.MONGODB_DB_MAIN
    },
    secret: process.env.SECRET
};

const production: IDBConfig = {
    port: process.env.PORT,
    database: {
        MONGODB_URI: process.env.MONGODB_URI,
        MONGODB_DB_MAIN: process.env.MONGODB_DB_MAIN
    },
    secret: process.env.SECRET
};

const test: IDBConfig = {
    port: process.env.PORT,
    database: {
        MONGODB_URI: process.env.MONGODB_URI,
        MONGODB_DB_MAIN: process.env.MONGODB_DB_MAIN_TEST
    },
    secret: process.env.SECRET
};

const config: { [name: string]: IDBConfig } = { test, development, production };

export default config[NODE_ENV];
