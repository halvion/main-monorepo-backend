const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgresql://postgres:admin@localhost:5432/LOGGING?schema=public',
});

async function main() {
  await client.connect();
  const res = await client.query(
    'SELECT service, method, path, "statusCode", "createdAt" FROM request_logs_h WHERE service = $1 ORDER BY "createdAt" DESC LIMIT 5',
    ['core-service']
  );
  console.log(JSON.stringify(res.rows, null, 2));
}

main().catch(console.error).finally(() => client.end());
