const { Pool } =  require('pg');
require('dotenv').config();

// Configure the connection to your local PostgreSQL database
const pool = new Pool({
    connectionString: process.env.DB_CONNECTION,
});

module.exports = pool;
