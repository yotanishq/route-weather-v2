require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;
const PID_FILE = path.join(__dirname, '.server.pid');

// Check for existing server instance
function checkExistingInstance() {
  if (fs.existsSync(PID_FILE)) {
    const pid = fs.readFileSync(PID_FILE, 'utf8');
    try {
      process.kill(parseInt(pid), 0); // Check if process is running
      console.log(`⚠️  Server already running with PID ${pid}`);
      console.log(`   To stop it: kill ${pid}`);
      console.log(`   Or remove ${PID_FILE} if the process is dead`);
      process.exit(1);
    } catch (e) {
      // Process is not running, remove stale PID file
      fs.unlinkSync(PID_FILE);
    }
  }
}

// Write PID file
function writePidFile() {
  fs.writeFileSync(PID_FILE, process.pid.toString());
}

// Cleanup on exit
function cleanup() {
  if (fs.existsSync(PID_FILE)) {
    fs.unlinkSync(PID_FILE);
  }
}

process.on('exit', cleanup);
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down server...');
  cleanup();
  process.exit(0);
});
process.on('SIGTERM', cleanup);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Route Weather Backend API is running' });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Test routes
const testRoutes = require('./routes/testRoutes');
app.use('/api', testRoutes);

// Start server with port conflict handling
function startServer(port) {
  const server = app.listen(port, () => {
    writePidFile();
    console.log('='.repeat(50));
    console.log('🚀 Route Weather Backend API');
    console.log('='.repeat(50));
    console.log(`✅ Server running on port ${port}`);
    console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`📡 API Endpoints:`);
    console.log(`   - http://localhost:${port}/`);
    console.log(`   - http://localhost:${port}/health`);
    console.log(`   - http://localhost:${port}/api/test-route`);
    console.log('='.repeat(50));
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`⚠️  Port ${port} is already in use`);
      if (port < 5010) {
        console.log(`🔄 Trying next available port: ${port + 1}`);
        startServer(port + 1);
      } else {
        console.error('❌ Could not find an available port');
        process.exit(1);
      }
    } else {
      console.error('❌ Server error:', err);
      process.exit(1);
    }
  });
}

// Check for existing instance and start server
checkExistingInstance();

// Temporary: Log TOMTOM_API_KEY for debugging
console.log('🔑 TOMTOM_API_KEY:', process.env.TOMTOM_API_KEY ? '✅ Loaded' : '❌ NOT FOUND');

startServer(PORT);
