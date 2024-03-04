import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function GET(request: Request) {
    const client = await pool.connect();
    const res = await client.query('SELECT * FROM users');
    client.release();
    return {
        status: 200,
        body: res.rows,
    };
}