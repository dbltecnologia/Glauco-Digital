import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8088;

// Log environment for debugging
console.log(`Starting server at ${new Date().toISOString()}`);
console.log(`Current directory: ${process.cwd()}`);
console.log(`__dirname: ${__dirname}`);

const distPath = path.join(__dirname, 'dist');
console.log(`Checking for dist folder at: ${distPath}`);

if (fs.existsSync(distPath)) {
    const files = fs.readdirSync(distPath);
    console.log(`Dist folder found. Contents (${files.length} items): ${files.slice(0, 5)}...`);
} else {
    console.error(`ERROR: Dist folder NOT found at ${distPath}`);
    // Try to find it in case it's one level up or down
    console.log(`Listing current directory: ${fs.readdirSync(__dirname)}`);
}

// Serve static files from the build directory
app.use(express.static(distPath));

// Route all requests to index.html to support SPA routing

// Route for /Iphandash to serve static HTML
app.get('/Iphandash', (req, res) => {
    console.log('GET /Iphandash received');
    const pagePath = path.join(distPath, 'forum_iphan_dashboard.html');
    if (fs.existsSync(pagePath)) {
        res.sendFile(pagePath);
    } else {
        console.error(`File not found at ${pagePath}`);
        res.status(404).send('Page not found');
    }
});

// Route for /ativacao to serve static HTML
app.get('/ativacao', (req, res) => {
    console.log('GET /ativacao received');
    const pagePath = path.join(distPath, 'pagina_ativacao.html');
    if (fs.existsSync(pagePath)) {
        res.sendFile(pagePath);
    } else {
        console.error(`File not found at ${pagePath}`);
        res.status(404).send('Page not found');
    }
});
app.get(/^(.*)$/, (req, res) => {
    const indexPath = path.join(distPath, 'index.html');
    if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
    } else {
        console.error(`404: Request for ${req.url} - index.html not found at ${indexPath}`);
        res.status(404).send('Not Found - Build may be missing');
    }
});

// Start the server listening on the port provided by App Hosting
// Binding to 0.0.0.0 is crucial for Cloud Run/App Hosting
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Production server listening on 0.0.0.0:${PORT}`);
});
