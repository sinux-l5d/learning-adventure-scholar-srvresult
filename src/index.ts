import app from '@app';
import mongoose from 'mongoose';
import config from './config';

const uri = `mongodb://${config.MONGO_APP_USER}:${config.MONGO_APP_PWD}@${config.MONGO_HOST}:${config.MONGO_PORT_EXT}/${config.MONGO_DB_NAME}`;

if (config.NODE_ENV !== 'production') console.log(uri);

mongoose.connect(uri, {}, function (error) {
  if (error) {
    console.error(error);
    process.exit(1);
  }
});

const port: number = Number(config.APP_PORT_EXT) || 3000;
app.listen(port, () => {
  console.log('Server is running on port ' + port);
});
