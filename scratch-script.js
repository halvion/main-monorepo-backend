const { Client } = require('pg');
require('dotenv').config();

async function run() {
  const client = new Client({ connectionString: process.env.LOGGING_DATABASE_URL });
  await client.connect();

  try {
    const res1 = await client.query('SELECT * FROM request_logs_h LIMIT 5');
    console.log('Header logs:', res1.rows);

    const res2 = await client.query('SELECT * FROM request_logs_d LIMIT 5');
    console.log('Detail logs:', res2.rows);

  } catch (err) {
    console.error('Error running script:', err);
  } finally {
    await client.end();
  }
}

run();
