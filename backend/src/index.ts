require('dotenv').config();

import http from 'http';
import app from './app';
import config from './config/config';
import { initSocket } from './socket';

const httpServer = http.createServer(app);

initSocket(httpServer);

httpServer.listen(config.port, () => {
  console.log(`DIALOG-Backend-Server running on port ${config.port}`);
});