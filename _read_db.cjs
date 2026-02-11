const Database = require('better-sqlite3');
const path = require('path');
const db = new Database(path.resolve(__dirname, 'content.db'));

console.log('=== SCREENS ===');
const screens = db.prepare('SELECT * FROM screens').all();
screens.forEach(s => {
    console.log(`\n--- Screen: ${s.slug} ---`);
    console.log(s.data);
});

console.log('\n\n=== SETTINGS ===');
const settings = db.prepare('SELECT * FROM settings').all();
settings.forEach(s => {
    console.log(`${s.key}: ${s.value}`);
});

db.close();
