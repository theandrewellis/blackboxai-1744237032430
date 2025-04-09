const express = require('express');
const multer = require('multer');
const path = require('path');
const https = require('https');
const fs = require('fs');

const app = express();
const port = 8000;

// Create uploads directory if it doesn't exist
const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// Configure upload with larger file size limit (50MB)
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 * 1024 } // 5GB
});

// Serve static files with absolute paths and proper caching
app.use('/public', express.static(path.join(__dirname, 'public'), {
  maxAge: '1d',
  setHeaders: (res, filePath) => {
    const mimeTypes = {
      '.css': 'text/css',
      '.js': 'application/javascript',
      '.html': 'text/html',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.ico': 'image/x-icon'
    };
    const ext = path.extname(filePath);
    if (mimeTypes[ext]) {
      res.setHeader('Content-Type', mimeTypes[ext]);
    }
  }
}));

// Serve index.html at root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle favicon.ico requests
app.get('/favicon.ico', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'favicon.ico'));
});

// Handle static file 404s
app.use('/public', (req, res) => {
  res.status(404).send('Static file not found');
});

// Upload endpoint
app.post('/upload', upload.single('video'), (req, res) => {
  if (!req.file) {
    console.error('No file was uploaded');
    return res.status(400).send('No file was uploaded');
  }
  console.log(`File uploaded: ${req.file.filename}`);
  res.redirect('/');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// List videos endpoint
app.get('/videos', (req, res) => {
  fs.readdir(uploadDir, (err, files) => {
    if (err) {
      return res.status(500).send('Error reading videos');
    }
    res.json(files);
  });
});

// Serve video files
app.use('/uploads', express.static(uploadDir));

// Log all incoming requests
app.use((req, res, next) => {
  console.log(`Received request: ${req.method} ${req.path}`);
  next();
});

// HTTP server for development
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port} (sandbox)`);
  console.log(`Static files served from: ${path.join(__dirname, 'public')}`);
});

// HTTPS server when certificates are available
if (fs.existsSync('selfsigned.key') && fs.existsSync('selfsigned.crt')) {
  const httpsOptions = {
    key: fs.readFileSync(path.join(__dirname, 'selfsigned.key')),
    cert: fs.readFileSync(path.join(__dirname, 'selfsigned.crt'))
  };
  https.createServer(httpsOptions, app).listen(4433, () => {
    console.log(`HTTPS server running on https://localhost:4433`);
    console.log(`Static files served from: ${path.join(__dirname, 'public')}`);
  });
}
