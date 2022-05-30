import app from '@app';
import mongoose from 'mongoose';
import config from './config';

import http from 'http';
import { Server } from 'socket.io';
import { MySocketServer } from '@type/sockets';
import { SocketService } from '@services/socket.service';

/////////////////////////////
//////////// BDD ////////////
/////////////////////////////

const uri = `mongodb://${config.MONGO_APP_USER}:${config.MONGO_APP_PWD}@${config.MONGO_HOST}:${config.MONGO_PORT_EXT}/${config.MONGO_DB_NAME}`;

if (config.NODE_ENV !== 'production') console.log(uri);

mongoose.connect(uri, {}, function (error) {
  if (error) {
    console.error(error);
    process.exit(1);
  }
});

////////////////////////////////
//////////// SERVER ////////////
////////////////////////////////

const httpServer = http.createServer(app);

const socketServer: MySocketServer = new Server(httpServer, {
  transports: ['websocket', 'polling'],
  serveClient: true,
  pingInterval: 10000,
  pingTimeout: 5000,
  cookie: false,
  cors: {
    origin: '*',
  },
});

SocketService.initInstance(socketServer);

/* Sert le fichier front-dev.html en mode développement.*/
if (config.NODE_ENV === 'development') {
  app.get('/front-dev', (req, res) => {
    res.sendFile('front-dev.html', { root: './' });
  });
}

const port: number = Number(config.APP_PORT_EXT) || 3001;
httpServer.listen(port, () => {
  console.log('Server is running on port ' + port + ' in ' + config.NODE_ENV + ' mode.');
});
