import { Router } from 'express';
import { 
  getProfile, 
  getProjects, 
  getProjectBySlugHandler,
  getCreativeWork,
  getAdminProjects,
  getAdminProjectById,
  createAdminProject,
  updateAdminProject,
  togglePublishProject,
  deleteAdminProject,
} from '../controllers/portfolioController.js';
import { 
  handleContactSubmission,
  getAdminMessages,
  updateAdminMessageStatus,
  toggleAdminMessageRead,
  deleteAdminMessage,
} from '../controllers/contactController.js';
import { handleLogin, verifyToken } from '../controllers/authController.js';
import { requireAdmin } from '../middleware/authMiddleware.js';
import { 
  apiRateLimiter, 
  contactRateLimiter, 
  authRateLimiter 
} from '../middleware/rateLimiter.js';

const router = Router();

// Health Check
router.get('/health', (_req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'Subhabrata Dey Portfolio Backend API',
    uptime: process.uptime(),
  });
});

// Authentication Endpoints
router.post('/auth/login', authRateLimiter, handleLogin);
router.get('/auth/verify', verifyToken);

// Public Portfolio Endpoints
router.get('/profile', apiRateLimiter, getProfile);
router.get('/projects', apiRateLimiter, getProjects); // Published projects with query filtering
router.get('/projects/:slug', apiRateLimiter, getProjectBySlugHandler); // Single project by slug
router.get('/creative', apiRateLimiter, getCreativeWork);
router.post('/contact', contactRateLimiter, handleContactSubmission); // Spam-protected contact endpoint

// ----------------- PROTECTED ADMIN ENDPOINTS -----------------
// Project Management
router.get('/admin/projects', requireAdmin, getAdminProjects);
router.post('/admin/projects', requireAdmin, createAdminProject);
router.get('/admin/projects/:id', requireAdmin, getAdminProjectById);
router.put('/admin/projects/:id', requireAdmin, updateAdminProject);
router.patch('/admin/projects/:id/publish', requireAdmin, togglePublishProject);
router.delete('/admin/projects/:id', requireAdmin, deleteAdminProject);

// Contact Message Management
router.get('/admin/messages', requireAdmin, getAdminMessages);
router.patch('/admin/messages/:id/status', requireAdmin, updateAdminMessageStatus);
router.patch('/admin/messages/:id/read', requireAdmin, toggleAdminMessageRead);
router.delete('/admin/messages/:id', requireAdmin, deleteAdminMessage);

export default router;
