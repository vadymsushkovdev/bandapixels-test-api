import mongoose from 'mongoose';
import config from '@config/env';
import IConnectOptions from './interfaces/interface';

const connectOptions: IConnectOptions = { useNewUrlParser: true, useUnifiedTopology: true };
const MONGO_URI: string = `${config.database.MONGODB_URI}${config.database.MONGODB_DB_MAIN}`;

class Connection {
    private readonly _uri: string;
    private readonly _options: IConnectOptions;
    private _instance: mongoose.Connection | null;

    constructor(uri: string, options: IConnectOptions) {
        this._uri = uri;
        this._options = options;
        this._instance = null;
    }

    init(): mongoose.Connection {
        const connection: mongoose.Connection = mongoose.createConnection(this._uri, this._options);

        connection.on('connecting', () => { console.log('\x1b[32m', 'MongoDB :: connecting'); });
        connection.on('error', (error) => { console.log('\x1b[31m', `MongoDB :: connection ${error}`); mongoose.disconnect(); });
        connection.on('connected', () => { console.log('\x1b[32m', 'MongoDB :: connected'); });
        connection.once('open', () => { console.log('\x1b[32m', 'MongoDB :: connection opened'); });
        connection.on('reconnected', () => { console.log('\x1b[33m"', 'MongoDB :: reconnected'); });
        connection.on('reconnectFailed', () => { console.log('\x1b[31m', 'MongoDB :: reconnectFailed'); });
        connection.on('disconnected', () => { console.log('\x1b[31m', 'MongoDB :: disconnected'); });
        connection.on('fullsetup', () => { console.log('\x1b[33m"', 'MongoDB :: reconnecting... %d'); });

        return connection;
    }

    getInstance(): mongoose.Connection {
        if (!this._instance) { this._instance = this.init(); }

        return this._instance;
    }
}

export default new Connection(MONGO_URI, connectOptions).getInstance();

