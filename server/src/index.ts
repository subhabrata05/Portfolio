import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import apiRoutes from './routes/api.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Allowed Origins: support comma-separated origins in CLIENT_ORIGIN or default dev origins
const allowedOrigins = process.env.CLIENT_ORIGIN 
  ? process.env.CLIENT_ORIGIN.split(',').map(s => s.trim())
  : ['http://localhost:5173', 'http://127.0.0.1:5173', 'http://localhost:3000'];

// Security Headers with Helmet
app.use(helmet({
  contentSecurityPolicy: false, // Allows cross-origin asset loading for 3D textures & fonts
  crossOriginResourcePolicy: { policy: 'cross-origin' },
}));

// CORS Configuration
app.use(cors({
  origin: (origin, callback) => {
    // Allow non-browser requests (e.g. curl, health checks) or explicitly allowed origins
    if (!origin || allowedOrigins.includes(origin) || process.env.NODE_ENV !== 'production') {
      callback(null, true);
    } else {
      callback(new Error(`Origin ${origin} is not allowed by CORS`));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
}));

// Body Parser with payload size limit
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// Root Greeting and API Discovery
app.get('/', (_req, res) => {
  res.status(200).json({
    message: 'Subhabrata Dey Portfolio API is operational.',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    documentation: '/api/health',
    endpoints: {
      health: 'GET /api/health',
      profile: 'GET /api/profile',
      projects: 'GET /api/projects (public)',
      projectBySlug: 'GET /api/projects/:slug (public)',
      creative: 'GET /api/creative (public)',
      contact: 'POST /api/contact (rate-limited)',
      adminAuth: 'POST /api/auth/login',
      adminProjects: 'GET|POST|PUT|PATCH|DELETE /api/admin/projects',
      adminMessages: 'GET|PATCH|DELETE /api/admin/messages',
    },
  });
});

// Mount API Routes
app.use('/api', apiRoutes);

// 404 Handler for Unmatched Routes
app.use(notFoundHandler);

// Centralized Error Handling Middleware
app.use(errorHandler);

const server = app.listen(PORT, () => {
  console.log(`✨ Subhabrata Dey Portfolio Backend active on http://localhost:${PORT}`);
  console.log(`📡 Permitted CORS Origins: ${allowedOrigins.join(', ')}`);
});

// Graceful Shutdown & Process Stability
process.on('unhandledRejection', (reason) => {
  console.warn('⚠️ Process caught unhandled rejection:', reason);
});

process.on('uncaughtException', (err) => {
  console.error('⚠️ Process caught uncaught exception:', err);
});

process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});

export default app;
