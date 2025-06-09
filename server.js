/**
 * Milano Labs V6.0 - Development Server
 * Simple Express server for serving static files and handling SPA routing
 */

const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8000;
const HOST = process.env.HOST || 'localhost';

// Enable CORS for development
app.use(cors());

// Serve static files
app.use(express.static('.'));

// Specific routes for assets
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/pages', express.static(path.join(__dirname, 'pages')));

// API endpoints for development (optional)
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '6.0.0'
  });
});

// Sample API endpoints that could be used by the application
app.get('/api/metrics', (req, res) => {
  res.json({
    appAvailability: 99.8,
    leadTime: 3.2,
    deploymentFrequency: 5.4,
    activeSDUs: 8
  });
});

app.get('/api/teams', (req, res) => {
  res.json([
    {
      id: 'cassiopeia',
      name: 'Cassiopeia',
      productManager: 'Sarah Johnson',
      techLead: 'David Chen',
      developers: 3,
      project: 'Interactive Dashboard',
      phase: 'Mission Impact Assessment'
    },
    {
      id: 'orion',
      name: 'Orion',
      productManager: 'Michael Chen',
      techLead: 'Jessica Wong',
      developers: 4,
      project: 'CI/CD Integration',
      phase: 'Rapid Solution Development'
    },
    {
      id: 'hydra',
      name: 'Hydra',
      productManager: 'Alex Rivera',
      techLead: 'Kim Lee',
      developers: 5,
      project: 'Data Pipeline',
      phase: 'Solution Integration'
    },
    {
      id: 'phoenix',
      name: 'Phoenix',
      productManager: 'Taylor Smith',
      techLead: 'Jordan Miller',
      developers: 3,
      project: 'ML Feature Store',
      phase: 'Customer Value Assessment'
    }
  ]);
});

app.get('/api/environments', (req, res) => {
  res.json([
    {
      name: 'DEV1',
      location: 'US-East',
      network: 'Non-Restricted',
      uptime: 99.7,
      securityLevel: 'Low',
      status: 'Available'
    },
    {
      name: 'DEV2',
      location: 'US-East',
      network: 'Non-Restricted',
      uptime: 99.8,
      securityLevel: 'Medium',
      status: 'Available'
    },
    {
      name: 'SC',
      location: 'US-Central',
      network: 'Restricted',
      uptime: 97.5,
      securityLevel: 'High',
      status: 'Maintenance'
    },
    {
      name: 'TS',
      location: 'US-West',
      network: 'Semi-Restricted',
      uptime: 99.8,
      securityLevel: 'High',
      status: 'Available'
    },
    {
      name: 'PROD',
      location: 'Multi-Region',
      network: 'Highly Restricted',
      uptime: 99.99,
      securityLevel: 'Maximum',
      status: 'Available'
    }
  ]);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: err.message
  });
});

// Handle 404s - serve index.html for SPA routing
app.get('*', (req, res) => {
  // For page requests, try to serve the specific page file
  if (req.path.startsWith('/pages/')) {
    res.sendFile(path.join(__dirname, req.path));
  } else {
    // For all other routes, serve the main index.html
    res.sendFile(path.join(__dirname, 'index.html'));
  }
});

// Start server
app.listen(PORT, HOST, () => {
  console.log('🚀 Milano Labs V6.0 Development Server');
  console.log('📍 Server running at:');
  console.log(`   Local:   http://${HOST}:${PORT}`);
  console.log(`   Network: http://localhost:${PORT}`);
  console.log('');
  console.log('📁 Serving files from:', __dirname);
  console.log('🔧 Environment: development');
  console.log('');
  console.log('📊 API Endpoints available:');
  console.log('   GET /api/health    - Server health check');
  console.log('   GET /api/metrics   - Application metrics');
  console.log('   GET /api/teams     - Team information');
  console.log('   GET /api/environments - Environment status');
  console.log('');
  console.log('💡 Press Ctrl+C to stop the server');
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('\n🛑 SIGINT received, shutting down gracefully');
  process.exit(0);
});

module.exports = app;