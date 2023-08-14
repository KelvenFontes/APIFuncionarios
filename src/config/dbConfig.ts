import { createPool, Pool } from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool: Pool = createPool({
  host: process.env.DB_HOST || 'fateclabdesweb.mysql.dbaas.com.br',
  user: process.env.DB_USER || 'fateclabdesweb',
  password: process.env.DB_PASSWORD || 'LabDesWeb1234@',
  database: process.env.DB_NAME || 'fateclabdesweb',
  // connectionLimit: 10,
});

export default pool;
