// Update with your config settings.
const path = require('path');

const BASE_PATH = path.join(__dirname);

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://postgres:1Paulomac@localhost:5432/gradesdb',
    migrations: {
      directory: path.join(BASE_PATH, 'migrations')
    },
    seeds: {
      directory: path.join(BASE_PATH, 'seeds')
    }
  }
  
};
