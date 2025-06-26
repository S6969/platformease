const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://cdnjs.cloudflare.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com", "https://cdnjs.cloudflare.com"],
            scriptSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'", "data:", "https:"],
            connectSrc: ["'self'"]
        }
    }
}));

// Performance middleware
app.use(compression());
app.use(cors());

// Parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from React build
app.use(express.static(path.join(__dirname, 'dist')));

// API routes for future features
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'healthy', 
        timestamp: new Date().toISOString(),
        version: '1.0.0',
        environment: process.env.NODE_ENV || 'development'
    });
});

// Enhanced API endpoints for platform features
app.get('/api/domains', (req, res) => {
    res.json({ 
        message: 'Domain listings endpoint - ready for implementation',
        data: [],
        pagination: { page: 1, limit: 10, total: 0 }
    });
});

app.get('/api/experts', (req, res) => {
    res.json({ 
        message: 'Traffic experts endpoint - ready for implementation',
        data: [],
        pagination: { page: 1, limit: 10, total: 0 }
    });
});

app.post('/api/partnerships', (req, res) => {
    res.json({ 
        message: 'Partnership creation endpoint - ready for implementation',
        success: true,
        partnershipId: `partnership_${Date.now()}`
    });
});

// Analytics endpoint
app.get('/api/analytics', (req, res) => {
    res.json({
        message: 'Analytics endpoint - ready for implementation',
        data: {
            totalDomains: 2000,
            totalExperts: 3000,
            totalRevenue: 500000,
            monthlyGrowth: 15.5
        }
    });
});

// Serve the React app for all other routes (SPA routing)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start server
app.listen(PORT, 'localhost', () => {
    console.log(`PlatformEase server running on http://localhost:${PORT}`);
});
