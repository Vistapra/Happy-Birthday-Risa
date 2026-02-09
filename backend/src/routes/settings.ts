import express from 'express';
import db from '../db';

const router = express.Router();

// GET all settings
router.get('/', (req, res) => {
    try {
        const rows = db.prepare('SELECT * FROM settings').all();
        const settings = rows.reduce((acc: any, row: any) => {
            acc[row.key] = row.value;
            return acc;
        }, {});
        res.json(settings);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch settings' });
    }
});

// UPDATE multiple settings
router.post('/', (req, res) => {
    const settings = req.body;
    const stmt = db.prepare('INSERT OR REPLACE INTO settings (key, value, updated_at) VALUES (?, ?, CURRENT_TIMESTAMP)');

    const updateTransaction = db.transaction((settingsObj: Record<string, any>) => {
        for (const [key, value] of Object.entries(settingsObj)) {
            stmt.run(key, typeof value === 'string' ? value : JSON.stringify(value));
        }
    });

    try {
        updateTransaction(settings);
        res.json({ message: 'Settings updated' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update settings' });
    }
});

export default router;
