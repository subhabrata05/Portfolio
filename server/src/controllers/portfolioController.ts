import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { FALLBACK_PROFILE, FALLBACK_CREATIVE } from '../data/fallbackData.js';
import { 
  getPublishedProjects, 
  getAllProjects, 
  getProjectBySlug,
  getProjectById,
  createProject, 
  updateProject, 
  deleteProject 
} from '../store/dataStore.js';
import { sanitizeString, sanitizeOptionalString, sanitizeStringArray } from '../utils/sanitize.js';
import { BadRequestError, NotFoundError } from '../middleware/errorHandler.js';

// Query Validation Schema for GET /api/projects
const projectQuerySchema = z.object({
  category: z.string().optional(),
  search: z.string().max(100).optional(),
  featured: z.enum(['true', 'false']).transform(val => val === 'true').optional(),
  limit: z.coerce.number().int().positive().max(50).optional(),
  page: z.coerce.number().int().positive().optional(),
});

// Create/Update Project Validation Schema
const projectInputSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters').max(120),
  slug: z.string().max(120).optional(),
  summary: z.string().max(300).optional(),
  description: z.string().min(10, 'Description must be at least 10 characters').max(5000),
  category: z.string().min(2, 'Category is required').max(80),
  technologies: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(), // Compatibility alias
  imageUrls: z.array(z.string()).optional(),
  imageUrl: z.string().optional(), // Compatibility alias
  featured: z.boolean().default(false),
  published: z.boolean().default(true),
  githubUrl: z.string().url('Invalid GitHub URL').optional().or(z.literal('')),
  liveDemoUrl: z.string().url('Invalid Live Demo URL').optional().or(z.literal('')),
  liveUrl: z.string().url('Invalid Live URL').optional().or(z.literal('')), // Compatibility alias
  sortOrder: z.number().int().optional(),
});

const getParam = (req: Request, key: string): string => {
  const val = req.params[key];
  return Array.isArray(val) ? val[0] : (val || '');
};

// PUBLIC: Get Profile Info
export const getProfile = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    return res.status(200).json({
      success: true,
      data: FALLBACK_PROFILE,
    });
  } catch (error) {
    next(error);
  }
};

// PUBLIC: Get Published Projects (with query filtering)
export const getProjects = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parseResult = projectQuerySchema.safeParse(req.query);
    if (!parseResult.success) {
      throw new BadRequestError('Invalid query parameters', parseResult.error.flatten().fieldErrors);
    }

    const { category, search, featured, limit = 20, page = 1 } = parseResult.data;
    const offset = (page - 1) * limit;

    const sanitizedSearch = search ? sanitizeString(search) : undefined;
    const sanitizedCategory = category ? sanitizeString(category) : undefined;

    const projects = await getPublishedProjects({
      category: sanitizedCategory,
      search: sanitizedSearch,
      featured,
      limit,
      offset,
    });

    return res.status(200).json({
      success: true,
      data: projects,
      pagination: {
        page,
        limit,
        count: projects.length,
      },
    });
  } catch (error) {
    next(error);
  }
};

// PUBLIC: Get Single Project by Slug
export const getProjectBySlugHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const rawSlug = getParam(req, 'slug');
    const slug = sanitizeString(rawSlug).toLowerCase();

    if (!slug) {
      throw new BadRequestError('Project slug parameter is required.');
    }

    const project = await getProjectBySlug(slug);
    if (!project || !project.published) {
      throw new NotFoundError(`Project with slug "${slug}" not found.`);
    }

    return res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

// PUBLIC: Get Creative Media
export const getCreativeWork = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    return res.status(200).json({
      success: true,
      data: FALLBACK_CREATIVE,
    });
  } catch (error) {
    next(error);
  }
};

// ADMIN: Get All Projects (including drafts)
export const getAdminProjects = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const projects = await getAllProjects();
    return res.status(200).json({
      success: true,
      data: projects,
      metrics: {
        total: projects.length,
        published: projects.filter(p => p.published).length,
        drafts: projects.filter(p => !p.published).length,
        featured: projects.filter(p => p.featured).length,
      },
    });
  } catch (error) {
    next(error);
  }
};

// ADMIN: Get Single Project by ID
export const getAdminProjectById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = getParam(req, 'id');
    const project = await getProjectById(id);
    if (!project) {
      throw new NotFoundError(`Project with ID "${id}" not found.`);
    }

    return res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

// ADMIN: Create Project
export const createAdminProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsed = projectInputSchema.safeParse(req.body);
    if (!parsed.success) {
      throw new BadRequestError('Invalid project creation payload', parsed.error.flatten().fieldErrors);
    }

    const data = parsed.data;
    
    // Sanitize string inputs
    const title = sanitizeString(data.title);
    const summary = data.summary ? sanitizeString(data.summary) : '';
    const description = sanitizeString(data.description);
    const category = sanitizeString(data.category);
    
    // Unify technologies
    const rawTechs = data.technologies || data.tags || [];
    const technologies = sanitizeStringArray(rawTechs);

    // Unify imageUrls
    let imageUrls: string[] = [];
    if (data.imageUrls && data.imageUrls.length > 0) {
      imageUrls = sanitizeStringArray(data.imageUrls);
    } else if (data.imageUrl) {
      const sanitizedImg = sanitizeString(data.imageUrl);
      if (sanitizedImg) imageUrls = [sanitizedImg];
    }

    // Slug generation
    let slug = data.slug ? sanitizeString(data.slug).toLowerCase() : '';
    if (!slug) {
      slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }

    const liveUrl = data.liveDemoUrl || data.liveUrl || undefined;

    const project = await createProject({
      title,
      slug,
      summary,
      description,
      category,
      technologies,
      imageUrls,
      featured: data.featured,
      published: data.published,
      githubUrl: data.githubUrl || undefined,
      liveDemoUrl: liveUrl,
      sortOrder: data.sortOrder,
    });

    return res.status(201).json({
      success: true,
      message: 'Project created successfully.',
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

// ADMIN: Update Project
export const updateAdminProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = getParam(req, 'id');
    const parsed = projectInputSchema.partial().safeParse(req.body);
    if (!parsed.success) {
      throw new BadRequestError('Invalid project update payload', parsed.error.flatten().fieldErrors);
    }

    const data = parsed.data;
    const updatePayload: any = {};

    if (data.title !== undefined) updatePayload.title = sanitizeString(data.title);
    if (data.slug !== undefined) updatePayload.slug = sanitizeString(data.slug).toLowerCase();
    if (data.summary !== undefined) updatePayload.summary = sanitizeString(data.summary);
    if (data.description !== undefined) updatePayload.description = sanitizeString(data.description);
    if (data.category !== undefined) updatePayload.category = sanitizeString(data.category);
    if (data.featured !== undefined) updatePayload.featured = data.featured;
    if (data.published !== undefined) updatePayload.published = data.published;
    if (data.githubUrl !== undefined) updatePayload.githubUrl = data.githubUrl || null;
    if (data.sortOrder !== undefined) updatePayload.sortOrder = data.sortOrder;

    const rawTechs = data.technologies || data.tags;
    if (rawTechs !== undefined) {
      updatePayload.technologies = sanitizeStringArray(rawTechs);
    }

    if (data.imageUrls !== undefined) {
      updatePayload.imageUrls = sanitizeStringArray(data.imageUrls);
    } else if (data.imageUrl !== undefined) {
      const sanitized = sanitizeString(data.imageUrl);
      updatePayload.imageUrls = sanitized ? [sanitized] : [];
    }

    const live = data.liveDemoUrl || data.liveUrl;
    if (live !== undefined) {
      updatePayload.liveDemoUrl = live || null;
    }

    const updated = await updateProject(id, updatePayload);
    if (!updated) {
      throw new NotFoundError(`Project with ID "${id}" not found.`);
    }

    return res.status(200).json({
      success: true,
      message: 'Project updated successfully.',
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

// ADMIN: Toggle Publish Status
export const togglePublishProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = getParam(req, 'id');
    const { published } = req.body;

    const all = await getAllProjects();
    const existing = all.find(p => p.id === id);
    if (!existing) {
      throw new NotFoundError(`Project with ID "${id}" not found.`);
    }

    const nextPublished = published !== undefined ? Boolean(published) : !existing.published;
    const updated = await updateProject(id, { published: nextPublished });

    return res.status(200).json({
      success: true,
      message: `Project ${nextPublished ? 'published' : 'unpublished'} successfully.`,
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

// ADMIN: Delete Project
export const deleteAdminProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = getParam(req, 'id');
    const deleted = await deleteProject(id);
    if (!deleted) {
      throw new NotFoundError(`Project with ID "${id}" not found.`);
    }

    return res.status(200).json({
      success: true,
      message: 'Project deleted successfully.',
    });
  } catch (error) {
    next(error);
  }
};
