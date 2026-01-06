import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;

// Serve static files from the build directory
app.use(express.static(path.join(__dirname, 'dist')));

// Route all requests to index.html to support SPA routing
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start the server listening on the port provided by App Hosting
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Production server listening on port ${PORT}`);
});
