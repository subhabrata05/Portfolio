import type { ProjectItem, ContactFormData } from '../types/portfolio';
const rawApiUrl = import.meta.env.VITE_API_URL || '';
const API_BASE = rawApiUrl ? `${rawApiUrl.replace(/\/$/, '')}/api` : '/api';

export interface AdminProject extends ProjectItem {
  published: boolean;
  sortOrder?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface AdminMessage {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export interface AdminMetrics {
  total: number;
  published: number;
  drafts: number;
  featured: number;
}

// ----------------- PUBLIC API -----------------

export async function fetchPublishedProjects(): Promise<ProjectItem[]> {
  try {
    const res = await fetch(`${API_BASE}/projects`);
    if (!res.ok) {
      throw new Error(`Failed to fetch projects: ${res.status}`);
    }
    const json = await res.json();
    return json.data || [];
  } catch (err) {
    console.warn('API fetchPublishedProjects error, relying on local fallback:', err);
    throw err;
  }
}

export async function submitContactMessage(formData: ContactFormData): Promise<{ success: boolean; message: string }> {
  const res = await fetch(`${API_BASE}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });

  const json = await res.json().catch(() => ({}));

  if (!res.ok) {
    let errorMsg = json.message || 'Failed to submit contact message.';
    if (json.errors) {
      const fieldErrors = Object.entries(json.errors)
        .map(([field, errs]) => `${field}: ${(errs as string[]).join(', ')}`)
        .join('; ');
      errorMsg = `${errorMsg} (${fieldErrors})`;
    }
    throw new Error(errorMsg);
  }

  return {
    success: true,
    message: json.message || 'Your message has been successfully recorded!',
  };
}

// ----------------- ADMIN AUTH -----------------

export async function loginAdmin(password: string): Promise<{ token: string; user: { name: string; role: string } }> {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password }),
  });

  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(json.message || 'Authentication failed. Please verify password.');
  }

  return { token: json.token, user: json.user };
}

export async function verifyAdminSession(token: string): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/auth/verify`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.ok;
  } catch {
    return false;
  }
}

// ----------------- ADMIN PROJECT CRUD -----------------

export async function fetchAdminProjects(token: string): Promise<{ data: AdminProject[]; metrics: AdminMetrics }> {
  const res = await fetch(`${API_BASE}/admin/projects`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Unauthorized or failed to fetch admin projects');
  return res.json();
}

export async function createAdminProject(token: string, project: Partial<AdminProject>): Promise<AdminProject> {
  const res = await fetch(`${API_BASE}/admin/projects`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(project),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || 'Failed to create project');
  return json.data;
}

export async function updateAdminProject(token: string, id: string, project: Partial<AdminProject>): Promise<AdminProject> {
  const res = await fetch(`${API_BASE}/admin/projects/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(project),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || 'Failed to update project');
  return json.data;
}

export async function togglePublishStatus(token: string, id: string, published: boolean): Promise<AdminProject> {
  const res = await fetch(`${API_BASE}/admin/projects/${id}/publish`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ published }),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || 'Failed to toggle publish status');
  return json.data;
}

export async function deleteAdminProject(token: string, id: string): Promise<boolean> {
  const res = await fetch(`${API_BASE}/admin/projects/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Failed to delete project');
  return true;
}

// ----------------- ADMIN MESSAGE MANAGEMENT -----------------

export async function fetchAdminMessages(token: string): Promise<{ data: AdminMessage[]; metrics: { total: number; unread: number } }> {
  const res = await fetch(`${API_BASE}/admin/messages`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Failed to fetch messages');
  return res.json();
}

export async function toggleAdminMessageRead(token: string, id: string): Promise<AdminMessage> {
  const res = await fetch(`${API_BASE}/admin/messages/${id}/read`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${token}` },
  });
  const json = await res.json();
  if (!res.ok) throw new Error('Failed to update message status');
  return json.data;
}

export async function deleteAdminMessage(token: string, id: string): Promise<boolean> {
  const res = await fetch(`${API_BASE}/admin/messages/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Failed to delete message');
  return true;
}
