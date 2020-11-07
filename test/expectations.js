// expectations.js

exports.FILE_YML = 'config.yml';
exports.FILE_JSON = 'config.json';
exports.FILEPATH_YML = './test/config.yml';
exports.FILEPATH_JSON = './test/config.json';

exports.config = {
  app: {
    name: 'example App',
    description: 'example App - configuration obtained from local yml file',
    environment: 'development',
  },
  log: {
    level: 'debug',
  },
  express: {
    port: 8080,
  },
};
