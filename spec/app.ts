import config from '@config';

test("L'environnement est en place", () => {
  expect(config.MONGO_PORT_EXT).toBeDefined();

  // prettier-ignore
  const env = [
    'MONGO_APP_USER',
    'MONGO_APP_PWD',
    'MONGO_HOST',
    'MONGO_DB_NAME',
    'NODE_ENV',
  ];

  env.forEach((element) => {
    expect(config[element]).toBeDefined();
  });
});
