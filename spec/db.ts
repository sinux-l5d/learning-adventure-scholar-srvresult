import mongoose from 'mongoose';

import { MongoMemoryServer } from 'mongodb-memory-server';

//@TODO: finir la mise en place de la DB pour les tests unitaires.
let mongo: MongoMemoryServer | undefined = undefined;

module.exports.setUp = async () => {
  mongo = await MongoMemoryServer.create();
  const url = mongo.getUri();
  await mongoose.connect(url);
};

module.exports.dropDatabase = async () => {
  if (mongo) {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongo.stop();
  }
};

module.exports.dropCollections = async () => {
  if (mongo) {
    const collections = mongoose.connection.collections;

    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({}); //collections.key
    }
  }
};
