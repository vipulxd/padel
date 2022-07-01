const {Pool} = require("pg");

const pg = new Pool({
  user: process.env.POSTGRES_user,
  password: process.env.POSTGRES_pass,
  host: process.env.POSTGRES_host,
  port: process.env.POSTGRES_port,
  database: process.env.POSTGRES_db,
});

module.exports = pg;
