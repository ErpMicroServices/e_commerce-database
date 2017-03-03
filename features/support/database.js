var pgp = require('pg-promise')();
import config from "./config";

const database = pgp(config.database);

export default database;
