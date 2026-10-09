import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { prisma, isDbConnected, setDbConnected } from '../db.js';
import { FALLBACK_PROJECTS } from '../data/fallbackData.js';

export interface StoredProject {
  id: string;
  title: string;
  slug: string;
  summary: string;
  description: string;
  technologies: string[];
  tags: string[]; // Frontend compatibility alias
  imageUrls: string[];
  imageUrl?: string | null; // Frontend compatibility alias
  githubUrl?: string | null;
  liveDemoUrl?: string | null;
  liveUrl?: string | null; // Frontend compatibility alias
  published: boolean;
  category: string;
  featured: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface StoredMessage {
  id: string;
  senderName: string;
  name: string; // Frontend compatibility alias
  email: string;
  subject: string;
  message: string;
  status: string; // "unread" | "read" | "archived"
  read: boolean; // Frontend compatibility alias
  createdAt: string;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, '../../data');
const STORE_FILE = path.join(DATA_DIR, 'store.json');

interface FileStoreData {
  projects: StoredProject[];
  messages: StoredMessage[];
}

function formatProject(p: any): StoredProject {
  const techs = Array.isArray(p.technologies) && p.technologies.length > 0 
    ? p.technologies 
    : (Array.isArray(p.tags) ? p.tags : []);
  
  const imgs = Array.isArray(p.imageUrls) && p.imageUrls.length > 0 
    ? p.imageUrls 
    : (p.imageUrl ? [p.imageUrl] : []);

  const live = p.liveDemoUrl || p.liveUrl || null;

  return {
    id: p.id,
    title: p.title,
    slug: p.slug,
    summary: p.summary || '',
    description: p.description || '',
    technologies: techs,
    tags: techs,
    imageUrls: imgs,
    imageUrl: imgs[0] || null,
    githubUrl: p.githubUrl || null,
    liveDemoUrl: live,
    liveUrl: live,
    published: p.published !== undefined ? Boolean(p.published) : true,
    category: p.category || 'Web Development',
    featured: Boolean(p.featured),
    sortOrder: typeof p.sortOrder === 'number' ? p.sortOrder : 0,
    createdAt: typeof p.createdAt === 'string' ? p.createdAt : (p.createdAt?.toISOString ? p.createdAt.toISOString() : new Date().toISOString()),
    updatedAt: typeof p.updatedAt === 'string' ? p.updatedAt : (p.updatedAt?.toISOString ? p.updatedAt.toISOString() : new Date().toISOString()),
  };
}

function formatMessage(m: any): StoredMessage {
  const sender = m.senderName || m.name || 'Anonymous';
  const status = m.status || (m.read ? 'read' : 'unread');

  return {
    id: m.id,
    senderName: sender,
    name: sender,
    email: m.email,
    subject: m.subject || '',
    message: m.message,
    status: status,
    read: status === 'read',
    createdAt: typeof m.createdAt === 'string' ? m.createdAt : (m.createdAt?.toISOString ? m.createdAt.toISOString() : new Date().toISOString()),
  };
}

// In-memory cache synced with store.json
let cache: FileStoreData = {
  projects: FALLBACK_PROJECTS.map((p, idx) => formatProject({
    ...p,
    published: true,
    sortOrder: idx,
  })),
  messages: [],
};

// Ensure data folder and file exist
try {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (fs.existsSync(STORE_FILE)) {
    const raw = fs.readFileSync(STORE_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    if (parsed.projects && Array.isArray(parsed.projects)) {
      cache = {
        projects: parsed.projects.map(formatProject),
        messages: Array.isArray(parsed.messages) ? parsed.messages.map(formatMessage) : [],
      };
    }
  } else {
    fs.writeFileSync(STORE_FILE, JSON.stringify(cache, null, 2), 'utf-8');
  }
} catch (e) {
  console.warn('File store init notice:', e);
}

function persistToFile() {
  try {
    fs.writeFileSync(STORE_FILE, JSON.stringify(cache, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error persisting to file store:', err);
  }
}

// ----------------- PROJECTS -----------------

export async function getPublishedProjects(filters?: {
  category?: string;
  search?: string;
  featured?: boolean;
  limit?: number;
  offset?: number;
}): Promise<StoredProject[]> {
  if (prisma && isDbConnected()) {
    try {
      const where: any = { published: true };
      if (filters?.category) {
        where.category = { equals: filters.category, mode: 'insensitive' };
      }
      if (filters?.featured !== undefined) {
        where.featured = filters.featured;
      }
      if (filters?.search) {
        where.OR = [
          { title: { contains: filters.search, mode: 'insensitive' } },
          { description: { contains: filters.search, mode: 'insensitive' } },
          { summary: { contains: filters.search, mode: 'insensitive' } },
        ];
      }

      const records = await prisma.project.findMany({
        where,
        orderBy: { sortOrder: 'asc' },
        ...(filters?.limit ? { take: filters.limit } : {}),
        ...(filters?.offset ? { skip: filters.offset } : {}),
      });

      if (records && records.length > 0) {
        return records.map(formatProject);
      }
    } catch (e) {
      setDbConnected(false);
      console.warn('Prisma query falling back to persistent store:', e);
    }
  }

  let list = cache.projects.filter(p => p.published);
  if (filters?.category) {
    list = list.filter(p => p.category.toLowerCase() === filters.category?.toLowerCase());
  }
  if (filters?.featured !== undefined) {
    list = list.filter(p => p.featured === filters.featured);
  }
  if (filters?.search) {
    const q = filters.search.toLowerCase();
    list = list.filter(p => 
      p.title.toLowerCase().includes(q) || 
      p.description.toLowerCase().includes(q) ||
      p.summary.toLowerCase().includes(q)
    );
  }
  if (typeof filters?.offset === 'number') {
    list = list.slice(filters.offset);
  }
  if (typeof filters?.limit === 'number') {
    list = list.slice(0, filters.limit);
  }

  return list;
}

export async function getAllProjects(): Promise<StoredProject[]> {
  if (prisma && isDbConnected()) {
    try {
      const records = await prisma.project.findMany({
        orderBy: { sortOrder: 'asc' },
      });
      if (records && records.length > 0) {
        return records.map(formatProject);
      }
    } catch (e) {
      setDbConnected(false);
      console.warn('Prisma query falling back to persistent store:', e);
    }
  }
  return cache.projects;
}

export async function getProjectBySlug(slug: string): Promise<StoredProject | null> {
  if (prisma && isDbConnected()) {
    try {
      const record = await prisma.project.findUnique({
        where: { slug },
      });
      if (record) {
        return formatProject(record);
      }
    } catch (e) {
      setDbConnected(false);
      console.warn('Prisma findUnique slug fallback:', e);
    }
  }
  const match = cache.projects.find(p => p.slug === slug);
  return match ? formatProject(match) : null;
}

export async function getProjectById(id: string): Promise<StoredProject | null> {
  if (prisma && isDbConnected()) {
    try {
      const record = await prisma.project.findUnique({
        where: { id },
      });
      if (record) {
        return formatProject(record);
      }
    } catch (e) {
      setDbConnected(false);
      console.warn('Prisma findUnique id fallback:', e);
    }
  }
  const match = cache.projects.find(p => p.id === id);
  return match ? formatProject(match) : null;
}

export async function createProject(data: Partial<StoredProject>): Promise<StoredProject> {
  const techs = Array.isArray(data.technologies) && data.technologies.length > 0 
    ? data.technologies 
    : (Array.isArray(data.tags) ? data.tags : []);

  const imgs = Array.isArray(data.imageUrls) && data.imageUrls.length > 0 
    ? data.imageUrls 
    : (data.imageUrl ? [data.imageUrl] : []);

  const live = data.liveDemoUrl || data.liveUrl || null;

  const newProject: StoredProject = formatProject({
    id: data.id || `proj-${Date.now()}`,
    title: data.title || 'Untitled Project',
    slug: data.slug || `project-${Date.now()}`,
    summary: data.summary || '',
    description: data.description || '',
    category: data.category || 'Web Development',
    technologies: techs,
    tags: techs,
    imageUrls: imgs,
    imageUrl: imgs[0] || null,
    featured: Boolean(data.featured),
    published: data.published !== undefined ? Boolean(data.published) : true,
    githubUrl: data.githubUrl || null,
    liveDemoUrl: live,
    liveUrl: live,
    sortOrder: typeof data.sortOrder === 'number' ? data.sortOrder : cache.projects.length,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  if (prisma && isDbConnected()) {
    try {
      const record = await prisma.project.create({
        data: {
          title: newProject.title,
          slug: newProject.slug,
          summary: newProject.summary,
          description: newProject.description,
          category: newProject.category,
          technologies: newProject.technologies,
          imageUrls: newProject.imageUrls,
          featured: newProject.featured,
          published: newProject.published,
          githubUrl: newProject.githubUrl || undefined,
          liveDemoUrl: newProject.liveDemoUrl || undefined,
          sortOrder: newProject.sortOrder,
        },
      });
      const formatted = formatProject(record);
      // Sync in-memory cache
      cache.projects.unshift(formatted);
      persistToFile();
      return formatted;
    } catch (e) {
      setDbConnected(false);
      console.warn('Prisma create failed, falling back to file store:', e);
    }
  }

  cache.projects.unshift(newProject);
  persistToFile();
  return newProject;
}

export async function updateProject(id: string, data: Partial<StoredProject>): Promise<StoredProject | null> {
  const techs = data.technologies || data.tags;
  const imgs = data.imageUrls || (data.imageUrl ? [data.imageUrl] : undefined);
  const live = data.liveDemoUrl || data.liveUrl;

  if (prisma && isDbConnected()) {
    try {
      const record = await prisma.project.update({
        where: { id },
        data: {
          ...(data.title !== undefined && { title: data.title }),
          ...(data.slug !== undefined && { slug: data.slug }),
          ...(data.summary !== undefined && { summary: data.summary }),
          ...(data.description !== undefined && { description: data.description }),
          ...(data.category !== undefined && { category: data.category }),
          ...(techs !== undefined && { technologies: techs }),
          ...(imgs !== undefined && { imageUrls: imgs }),
          ...(data.featured !== undefined && { featured: data.featured }),
          ...(data.published !== undefined && { published: data.published }),
          ...(data.githubUrl !== undefined && { githubUrl: data.githubUrl || undefined }),
          ...(live !== undefined && { liveDemoUrl: live || undefined }),
          ...(data.sortOrder !== undefined && { sortOrder: data.sortOrder }),
        },
      });
      const formatted = formatProject(record);
      const idx = cache.projects.findIndex(p => p.id === id);
      if (idx !== -1) {
        cache.projects[idx] = formatted;
        persistToFile();
      }
      return formatted;
    } catch (e) {
      setDbConnected(false);
      console.warn('Prisma update failed, updating file store:', e);
    }
  }

  const idx = cache.projects.findIndex(p => p.id === id);
  if (idx === -1) return null;

  const updated = formatProject({
    ...cache.projects[idx],
    ...data,
    ...(techs !== undefined && { technologies: techs, tags: techs }),
    ...(imgs !== undefined && { imageUrls: imgs, imageUrl: imgs[0] || null }),
    ...(live !== undefined && { liveDemoUrl: live, liveUrl: live }),
    updatedAt: new Date().toISOString(),
  });

  cache.projects[idx] = updated;
  persistToFile();
  return updated;
}

export async function deleteProject(id: string): Promise<boolean> {
  if (prisma && isDbConnected()) {
    try {
      await prisma.project.delete({ where: { id } });
    } catch (e) {
      setDbConnected(false);
      console.warn('Prisma delete fallback:', e);
    }
  }

  const initialLen = cache.projects.length;
  cache.projects = cache.projects.filter(p => p.id !== id);
  persistToFile();
  return cache.projects.length < initialLen;
}

// ----------------- MESSAGES -----------------

export async function createContactMessage(data: {
  senderName: string;
  email: string;
  subject?: string;
  message: string;
}): Promise<StoredMessage> {
  const msg: StoredMessage = formatMessage({
    id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    senderName: data.senderName,
    email: data.email,
    subject: data.subject || '',
    message: data.message,
    status: 'unread',
    createdAt: new Date().toISOString(),
  });

  if (prisma && isDbConnected()) {
    try {
      const record = await prisma.contactMessage.create({
        data: {
          senderName: msg.senderName,
          email: msg.email,
          subject: msg.subject,
          message: msg.message,
          status: 'unread',
        },
      });
      const formatted = formatMessage(record);
      cache.messages.unshift(formatted);
      persistToFile();
      return formatted;
    } catch (e) {
      setDbConnected(false);
      console.warn('Prisma message create fallback:', e);
    }
  }

  cache.messages.unshift(msg);
  persistToFile();
  return msg;
}

export async function getAllContactMessages(): Promise<StoredMessage[]> {
  if (prisma && isDbConnected()) {
    try {
      const records = await prisma.contactMessage.findMany({
        orderBy: { createdAt: 'desc' },
      });
      if (records && records.length > 0) {
        return records.map(formatMessage);
      }
    } catch (e) {
      setDbConnected(false);
      console.warn('Prisma messages query fallback:', e);
    }
  }
  return cache.messages;
}

export async function updateMessageStatus(id: string, status: string): Promise<StoredMessage | null> {
  if (prisma && isDbConnected()) {
    try {
      const updated = await prisma.contactMessage.update({
        where: { id },
        data: { status },
      });
      const formatted = formatMessage(updated);
      const idx = cache.messages.findIndex(m => m.id === id);
      if (idx !== -1) {
        cache.messages[idx] = formatted;
        persistToFile();
      }
      return formatted;
    } catch (e) {
      setDbConnected(false);
      console.warn('Prisma message status update fallback:', e);
    }
  }

  const msg = cache.messages.find(m => m.id === id);
  if (!msg) return null;
  msg.status = status;
  msg.read = status === 'read';
  persistToFile();
  return msg;
}

export async function toggleMessageRead(id: string): Promise<StoredMessage | null> {
  const msg = cache.messages.find(m => m.id === id);
  const nextStatus = msg && msg.status === 'read' ? 'unread' : 'read';
  return updateMessageStatus(id, nextStatus);
}

export async function deleteContactMessage(id: string): Promise<boolean> {
  if (prisma && isDbConnected()) {
    try {
      await prisma.contactMessage.delete({ where: { id } });
    } catch (e) {
      setDbConnected(false);
      console.warn('Prisma message delete fallback:', e);
    }
  }

  const initialLen = cache.messages.length;
  cache.messages = cache.messages.filter(m => m.id !== id);
  persistToFile();
  return cache.messages.length < initialLen;
}
