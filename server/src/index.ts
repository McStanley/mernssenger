#!/usr/bin/env node

import 'dotenv/config';
import env from './env';

import app from './app';
import http from 'http';
import mongoose from 'mongoose';

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

mongoose
  .connect(env.MONGODB_URI, {
    dbName: 'mernssenger',
  })
  .catch((err: Error) => console.error(err.toString()));

mongoose.connection.on('error', (err: Error) => console.error(err.toString()));
mongoose.connection.on('connected', () => console.log('MongoDB: Connected'));

function normalizePort(val: string) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}

function onError(error: NodeJS.ErrnoException) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr!.port;
  console.log('Listening on ' + bind);
}
