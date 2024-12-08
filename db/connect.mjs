import crypto from 'crypto';
import Database from 'better-sqlite3-multiple-ciphers';
import path from 'path'
import dotenv from 'dotenv';

// Load environment variables from .env
dotenv.config();

// Generate a 256-bit (32-byte) key for AES encryption
// const secretKey = crypto.randomBytes(32);  // Creates a 32-byte buffer
// console.log('Generated Secret Key (hex):', secretKey.toString('hex'));

const secretKey = Buffer.from(process.env.DB_SECRET_KEY, 'hex');
// console.log(secretKey)

// const db = new Database(path.resolve('./db/nutrition.db'), {
//   key: secretKey,
//   cypher: 'sqleet',
// });
const db = new Database(path.resolve('./db/nutrition.db'));

db.pragma(`key='${secretKey}'`);
// db.pragma(`rekey='${secretKey}'`);
db.pragma('journal_mode = WAL');

// try {
//   // Read data from the encrypted database
//   const rows = db.prepare('SELECT * FROM foodData').all();
//   console.log('Decrypted Data:', rows[0]);
// } catch(err) {
//   console.error('Failed to decrypt database:', err.message);
// }

// Close the database
// db.close();
// Shutdown logic
process.on('SIGINT', () => {
  db.close();
  console.log('Database connection closed.');
  process.exit(0);
});

export default db
