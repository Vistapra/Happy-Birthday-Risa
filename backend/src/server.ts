import express from 'express';
import cors from 'cors';
import path from 'path';
import { initDb } from './db';
import screenRoutes from './routes/screens';
import settingsRoutes from './routes/settings';
import uploadRoutes from './routes/upload';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Initialize Database
initDb();

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.use('/api/screens', screenRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/', (req, res) => {
    res.send('Dynamic Content Platform API');
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
