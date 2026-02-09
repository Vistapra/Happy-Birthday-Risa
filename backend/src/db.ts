import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.resolve(__dirname, '../../content.db');
const db = new Database(dbPath);

export const initDb = () => {
    db.exec(`
        CREATE TABLE IF NOT EXISTS screens (
            slug TEXT PRIMARY KEY,
            type TEXT NOT NULL,
            data TEXT NOT NULL,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
        CREATE TABLE IF NOT EXISTS settings (
            key TEXT PRIMARY KEY,
            value TEXT NOT NULL,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
    `);
    console.log('Database initialized');
};

export default db;
