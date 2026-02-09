import express from 'express';
import db from '../db';

const router = express.Router();

// GET all screens
router.get('/', (req, res) => {
    try {
        const rows = db.prepare('SELECT * FROM screens').all();
        const screens = rows.map((row: any) => ({
            ...row,
            data: JSON.parse(row.data)
        }));
        res.json(screens);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch screens' });
    }
});

// GET screen by slug
router.get('/:slug', (req, res) => {
    try {
        const row: any = db.prepare('SELECT * FROM screens WHERE slug = ?').get(req.params.slug);
        if (!row) {
            return res.status(404).json({ error: 'Screen not found' });
        }
        res.json({ ...row, data: JSON.parse(row.data) });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch screen' });
    }
});

// UPDATE screen
router.put('/:slug', (req, res) => {
    const { slug } = req.params;
    const { data } = req.body;
    try {
        const info = db.prepare('UPDATE screens SET data = ?, updated_at = CURRENT_TIMESTAMP WHERE slug = ?')
            .run(JSON.stringify(data), slug);
        if (info.changes === 0) {
            return res.status(404).json({ error: 'Screen not found' });
        }
        res.json({ message: 'Screen updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update screen' });
    }
});

// ARRAY OPERATIONS (Assuming data has arrays like definitions)
// This is a generic helper to push to an array in the JSON
router.post('/:slug/items', (req, res) => {
    const { slug } = req.params;
    const { listKey, item } = req.body; // e.g., listKey="memories", item={id: ...}

    try {
        const row: any = db.prepare('SELECT data FROM screens WHERE slug = ?').get(slug);
        if (!row) return res.status(404).json({ error: 'Screen not found' });

        const data = JSON.parse(row.data);
        if (!data[listKey] || !Array.isArray(data[listKey])) {
            // Attempt to find it in nested objects (like memories.list)
            if (data.list && Array.isArray(data.list)) {
                data.list.push(item);
            } else if (data.memories && Array.isArray(data.memories)) {
                data.memories.push(item);
            } else if (data.paragraphs && Array.isArray(data.paragraphs)) {
                data.paragraphs.push(item);
            } else if (data.highlights && Array.isArray(data.highlights)) {
                data.highlights.push(item);
            } else {
                return res.status(400).json({ error: `List not found in screen data` });
            }
        } else {
            data[listKey].push(item);
        }

        db.prepare('UPDATE screens SET data = ?, updated_at = CURRENT_TIMESTAMP WHERE slug = ?')
            .run(JSON.stringify(data), slug);

        res.json({ message: 'Item added successfully', data });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add item' });
    }
});


export default router;
