import { Pool } from 'pg';
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: +(process.env.DB_PORT || 5432),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const seedRoles = async () => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const roles = ['USER', 'ADMIN', 'MODERATOR'];
    for (const role of roles) {
      await client.query(
        `INSERT INTO roles(role_name) VALUES($1)`,
        [role],
      );
    }

    await client.query('COMMIT');
    console.log('Roles seeded');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error( 'Seeding failed', err);
  } finally {
    client.release();
    await pool.end();
  }
};

seedRoles();
