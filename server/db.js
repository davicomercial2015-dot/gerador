import { createClient } from '@libsql/client';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const defaultLocalDb = `file:${path.resolve(__dirname, 'local.db')}`;

const url = process.env.TURSO_DATABASE_URL || defaultLocalDb;
const authToken = process.env.TURSO_AUTH_TOKEN;

export const db = createClient({
  url,
  authToken,
});

async function initDb() {
  try {
    await db.execute(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      plan TEXT DEFAULT 'free',
      credits_remaining INTEGER DEFAULT 0,
      stripe_customer_id TEXT
    )`);
    console.log('Banco de dados conectado e tabela users verificada com sucesso.');
  } catch (error) {
    console.error('Erro ao inicializar banco de dados Turso:', error);
  }
}

initDb();
