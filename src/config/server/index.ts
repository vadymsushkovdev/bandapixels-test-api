import http from 'http';
import { onError, onListening } from './serverHandlers';
import server from './server';


const Server: http.Server = http.createServer(server);

Server.listen(server.get('port'));

Server.on('error', (error: Error) => onError(error, server.get('port')));
Server.on('listening', onListening.bind(Server));
