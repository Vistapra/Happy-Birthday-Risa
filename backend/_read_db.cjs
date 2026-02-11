const Database = require('better-sqlite3');
const path = require('path');
const db = new Database(path.resolve(__dirname, '../content.db'));

const screens = db.prepare('SELECT * FROM screens').all();
screens.forEach(s => {
    if (s.slug === 'preloader' || s.slug === 'opening' || s.slug === 'greeting' || s.slug === 'message') {
        console.log(`\n--- Screen: ${s.slug} ---`);
        console.log(s.data);
    }
});

db.close();
