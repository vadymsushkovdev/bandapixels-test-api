
export default interface IDBConfig {
    port: string | number | undefined;
    database: {
        MONGODB_URI: string | undefined;
        MONGODB_DB_MAIN: string | undefined;
    };
    secret: string | undefined;
}
