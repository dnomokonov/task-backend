require('dotenv').config();

const pgp = require('pg-promise')();
const db = pgp(process.env.DATABASE);

module.exports = db;