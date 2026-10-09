import React, { useState, useEffect } from 'react';
import { 
  Lock, 
  Unlock, 
  X, 
  Plus, 
  Edit3, 
  Trash2, 
  Eye, 
  EyeOff, 
  CheckCircle, 
  AlertCircle, 
  Inbox, 
  FolderGit2, 
  LogOut, 
  RefreshCw, 
  Mail, 
  Calendar, 
  Star 
} from 'lucide-react';
import { 
  loginAdmin, 
  verifyAdminSession, 
  fetchAdminProjects, 
  createAdminProject, 
  updateAdminProject, 
  togglePublishStatus, 
  deleteAdminProject, 
  fetchAdminMessages, 
  toggleAdminMessageRead, 
  deleteAdminMessage,
  type AdminProject,
  type AdminMessage,
  type AdminMetrics
} from '../../services/api';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  onProjectChanged?: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
  isOpen, 
  onClose,
  onProjectChanged 
}) => {
  const [token, setToken] = useState<string | null>(null);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  // Dashboard state
  const [activeTab, setActiveTab] = useState<'projects' | 'messages'>('projects');
  const [projects, setProjects] = useState<AdminProject[]>([]);
  const [metrics, setMetrics] = useState<AdminMetrics>({ total: 0, published: 0, drafts: 0, featured: 0 });
  const [messages, setMessages] = useState<AdminMessage[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Edit / Create project modal state
  const [isEditingProject, setIsEditingProject] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [projectForm, setProjectForm] = useState({
    title: '',
    category: 'Web Development',
    summary: '',
    description: '',
    tagsString: '',
    githubUrl: '',
    liveUrl: '',
    featured: false,
    published: true,
  });

  // Check saved session on mount
  useEffect(() => {
    const savedToken = sessionStorage.getItem('portfolio_admin_token');
    if (savedToken) {
      verifyAdminSession(savedToken).then((valid) => {
        if (valid) {
          setToken(savedToken);
        } else {
          sessionStorage.removeItem('portfolio_admin_token');
        }
      });
    }
  }, []);

  // Fetch data when authenticated
  const loadAdminData = async () => {
    if (!token) return;
    setIsLoadingData(true);
    try {
      const [projRes, msgRes] = await Promise.all([
        fetchAdminProjects(token),
        fetchAdminMessages(token),
      ]);
      setProjects(projRes.data);
      setMetrics(projRes.metrics);
      setMessages(msgRes.data);
      setUnreadCount(msgRes.metrics.unread);
    } catch (err: any) {
      showNotification('error', err.message || 'Failed to fetch admin data.');
    } finally {
      setIsLoadingData(false);
    }
  };

  useEffect(() => {
    if (token && isOpen) {
      loadAdminData();
    }
  }, [token, isOpen]);

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;
    setIsAuthenticating(true);
    setAuthError('');
    try {
      const res = await loginAdmin(password);
      setToken(res.token);
      sessionStorage.setItem('portfolio_admin_token', res.token);
      setPassword('');
      showNotification('success', 'Authenticated successfully as Administrator.');
    } catch (err: any) {
      setAuthError(err.message || 'Authentication rejected by server.');
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleLogout = () => {
    setToken(null);
    sessionStorage.removeItem('portfolio_admin_token');
    showNotification('success', 'Logged out.');
  };

  // Project Actions
  const handleOpenCreateProject = () => {
    setEditingProjectId(null);
    setProjectForm({
      title: '',
      category: 'Web Development',
      summary: '',
      description: '',
      tagsString: 'React, TypeScript, Tailwind CSS',
      githubUrl: 'https://github.com',
      liveUrl: '',
      featured: false,
      published: true,
    });
    setIsEditingProject(true);
  };

  const handleOpenEditProject = (p: AdminProject) => {
    setEditingProjectId(p.id);
    setProjectForm({
      title: p.title,
      category: p.category,
      summary: p.summary,
      description: p.description,
      tagsString: p.tags.join(', '),
      githubUrl: p.githubUrl || '',
      liveUrl: p.liveUrl || '',
      featured: p.featured,
      published: p.published,
    });
    setIsEditingProject(true);
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    const tags = projectForm.tagsString.split(',').map(t => t.trim()).filter(Boolean);
    const payload = {
      title: projectForm.title,
      category: projectForm.category as any,
      summary: projectForm.summary,
      description: projectForm.description,
      tags,
      githubUrl: projectForm.githubUrl || undefined,
      liveUrl: projectForm.liveUrl || undefined,
      featured: projectForm.featured,
      published: projectForm.published,
    };

    try {
      if (editingProjectId) {
        await updateAdminProject(token, editingProjectId, payload);
        showNotification('success', `Project "${projectForm.title}" updated.`);
      } else {
        await createAdminProject(token, payload);
        showNotification('success', `New project "${projectForm.title}" created.`);
      }
      setIsEditingProject(false);
      loadAdminData();
      onProjectChanged?.();
    } catch (err: any) {
      showNotification('error', err.message || 'Failed to save project.');
    }
  };

  const handleTogglePublish = async (id: string, currentPublished: boolean) => {
    if (!token) return;
    try {
      await togglePublishStatus(token, id, !currentPublished);
      showNotification('success', `Project ${!currentPublished ? 'published' : 'moved to draft'}.`);
      loadAdminData();
      onProjectChanged?.();
    } catch (err: any) {
      showNotification('error', err.message || 'Failed to update publish state.');
    }
  };

  const handleDeleteProject = async (id: string, title: string) => {
    if (!token) return;
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;
    try {
      await deleteAdminProject(token, id);
      showNotification('success', `Project "${title}" deleted.`);
      loadAdminData();
      onProjectChanged?.();
    } catch (err: any) {
      showNotification('error', err.message || 'Failed to delete project.');
    }
  };

  // Message Actions
  const handleToggleMessageRead = async (id: string) => {
    if (!token) return;
    try {
      await toggleAdminMessageRead(token, id);
      loadAdminData();
    } catch (err: any) {
      showNotification('error', err.message || 'Failed to update message.');
    }
  };

  const handleDeleteMessage = async (id: string) => {
    if (!token) return;
    if (!window.confirm('Delete this message permanently?')) return;
    try {
      await deleteAdminMessage(token, id);
      showNotification('success', 'Message deleted.');
      loadAdminData();
    } catch (err: any) {
      showNotification('error', err.message || 'Failed to delete message.');
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-background/90 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="admin-title"
    >
      <div className="relative w-full max-w-5xl max-h-[92vh] glass-card rounded-2xl border border-white/15 shadow-glass-heavy flex flex-col overflow-hidden">
        
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-background-surface/80">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-electric/15 text-electric-light border border-electric/30">
              {token ? <Unlock className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
            </div>
            <div>
              <h2 id="admin-title" className="text-base sm:text-lg font-display font-bold text-white flex items-center gap-2">
                <span>Portfolio Studio & Admin</span>
                {token && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Server Verified
                  </span>
                )}
              </h2>
              <p className="text-xs text-zinc-400 font-mono">
                Subhabrata Dey • PostgreSQL & REST API Management
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {token && (
              <>
                <button
                  type="button"
                  onClick={loadAdminData}
                  disabled={isLoadingData}
                  title="Reload Data"
                  className="p-2 rounded-xl glass-card hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                >
                  <RefreshCw className={`w-4 h-4 ${isLoadingData ? 'animate-spin text-electric-light' : ''}`} />
                </button>
                <button
                  type="button"
                  onClick={handleLogout}
                  title="Log out"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl glass-card text-xs text-zinc-300 hover:text-rose-300 hover:bg-rose-500/10 border-white/10 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl glass-card text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close Admin Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Global Floating Notification */}
        {notification && (
          <div className={`mx-6 mt-4 p-3 rounded-xl border text-xs flex items-center gap-2 animate-in slide-in-from-top-1 ${
            notification.type === 'success' 
              ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300' 
              : 'bg-rose-500/15 border-rose-500/30 text-rose-300'
          }`}>
            {notification.type === 'success' ? <CheckCircle className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
            <span>{notification.message}</span>
          </div>
        )}

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {!token ? (
            /* Login Form */
            <div className="max-w-md mx-auto my-12 glass-card rounded-2xl p-6 sm:p-8 border border-white/10 text-center">
              <div className="w-12 h-12 rounded-2xl bg-electric/10 border border-electric/30 text-electric-light flex items-center justify-center mx-auto mb-4">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-display font-bold text-white mb-2">
                Administrator Authentication
              </h3>
              <p className="text-xs text-zinc-400 mb-6 leading-relaxed">
                Enter your administrative key configured in <code className="text-zinc-300 bg-white/5 px-1 py-0.5 rounded">server/.env</code>. Authorization is cryptographically verified by the backend.
              </p>

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter admin password..."
                    className="w-full px-4 py-3 rounded-xl bg-background-elevated border border-white/10 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-electric focus:ring-1 focus:ring-electric transition-colors"
                  />
                </div>

                {authError && (
                  <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2 text-left">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{authError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isAuthenticating}
                  className="w-full py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-electric to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-glow-subtle transition-all disabled:opacity-50"
                >
                  {isAuthenticating ? 'Authenticating with server...' : 'Verify & Enter Dashboard'}
                </button>
              </form>
            </div>
          ) : (
            /* Authenticated Admin Views */
            <div className="space-y-6">
              
              {/* Tab Navigation & Metrics Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab('projects')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                      activeTab === 'projects'
                        ? 'bg-electric text-white shadow-glow-subtle'
                        : 'glass-card text-zinc-400 hover:text-white'
                    }`}
                  >
                    <FolderGit2 className="w-4 h-4" />
                    <span>Projects ({metrics.total})</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab('messages')}
                    className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                      activeTab === 'messages'
                        ? 'bg-electric text-white shadow-glow-subtle'
                        : 'glass-card text-zinc-400 hover:text-white'
                    }`}
                  >
                    <Inbox className="w-4 h-4" />
                    <span>Messages ({messages.length})</span>
                    {unreadCount > 0 && (
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                    )}
                  </button>
                </div>

                {activeTab === 'projects' && (
                  <button
                    type="button"
                    onClick={handleOpenCreateProject}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-glow-subtle transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    <span>New Project</span>
                  </button>
                )}
              </div>

              {/* TAB 1: PROJECTS MANAGER */}
              {activeTab === 'projects' && (
                <div className="space-y-4">
                  {/* Quick Metrics */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                      <span className="text-[10px] font-mono text-zinc-400 uppercase">Total</span>
                      <p className="text-xl font-display font-bold text-white">{metrics.total}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                      <span className="text-[10px] font-mono text-emerald-400 uppercase">Published</span>
                      <p className="text-xl font-display font-bold text-emerald-300">{metrics.published}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                      <span className="text-[10px] font-mono text-amber-400 uppercase">Drafts</span>
                      <p className="text-xl font-display font-bold text-amber-300">{metrics.drafts}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                      <span className="text-[10px] font-mono text-electric-light uppercase">Featured</span>
                      <p className="text-xl font-display font-bold text-blue-300">{metrics.featured}</p>
                    </div>
                  </div>

                  {/* Projects List */}
                  <div className="divide-y divide-white/5 border border-white/10 rounded-2xl overflow-hidden glass-card">
                    {projects.map((p) => (
                      <div key={p.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors">
                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h4 className="text-base font-display font-bold text-white">
                              {p.title}
                            </h4>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 text-zinc-400 border border-white/5">
                              {p.category}
                            </span>
                            {p.featured && (
                              <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-electric/20 text-blue-300">
                                <Star className="w-3 h-3 fill-current" />
                                Featured
                              </span>
                            )}
                            <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                              p.published 
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                                : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            }`}>
                              {p.published ? 'Live / Published' : 'Draft Only'}
                            </span>
                          </div>
                          <p className="text-xs text-zinc-400 line-clamp-1">
                            {p.summary}
                          </p>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            type="button"
                            onClick={() => handleTogglePublish(p.id, p.published)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors flex items-center gap-1 ${
                              p.published
                                ? 'bg-amber-500/10 text-amber-300 border-amber-500/30 hover:bg-amber-500/20'
                                : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/20'
                            }`}
                          >
                            {p.published ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                            <span>{p.published ? 'Unpublish' : 'Publish'}</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleOpenEditProject(p)}
                            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 transition-colors"
                            title="Edit Project"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDeleteProject(p.id, p.title)}
                            className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 transition-colors"
                            title="Delete Project"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 2: MESSAGES INBOX */}
              {activeTab === 'messages' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs text-zinc-400 font-mono px-1">
                    <span>Total Inquiries: {messages.length}</span>
                    <span className="text-cyan-400">{unreadCount} Unread</span>
                  </div>

                  {messages.length === 0 ? (
                    <div className="p-12 text-center glass-card rounded-2xl border border-white/5">
                      <Inbox className="w-8 h-8 text-zinc-500 mx-auto mb-2" />
                      <p className="text-sm text-zinc-400">No contact messages received yet.</p>
                      <p className="text-xs text-zinc-500 mt-1">Submitted inquiries will appear here in real time.</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {messages.map((m) => (
                        <div 
                          key={m.id} 
                          className={`p-5 rounded-2xl border transition-all ${
                            m.read 
                              ? 'bg-background-elevated/40 border-white/5' 
                              : 'glass-card border-electric/30 shadow-glow-subtle'
                          }`}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                            <div className="flex items-center gap-2">
                              <span className={`w-2 h-2 rounded-full ${m.read ? 'bg-zinc-600' : 'bg-cyan-400 animate-pulse'}`} />
                              <h4 className="text-sm font-display font-bold text-white">
                                {m.name}
                              </h4>
                              <span className="text-xs font-mono text-electric-light">
                                &lt;{m.email}&gt;
                              </span>
                            </div>
                            <div className="flex items-center gap-3 text-xs text-zinc-400 font-mono">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3.5 h-3.5" />
                                {new Date(m.createdAt).toLocaleDateString()} {new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </span>
                            </div>
                          </div>

                          {m.subject && (
                            <div className="text-xs font-semibold text-zinc-300 mb-2">
                              Topic: {m.subject}
                            </div>
                          )}

                          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed bg-white/[0.02] p-3 rounded-xl border border-white/5 mb-3">
                            {m.message}
                          </p>

                          <div className="flex items-center justify-between pt-2 border-t border-white/5">
                            <button
                              type="button"
                              onClick={() => handleToggleMessageRead(m.id)}
                              className="text-xs font-mono text-zinc-400 hover:text-electric-light transition-colors"
                            >
                              {m.read ? 'Mark as Unread' : 'Mark as Read'}
                            </button>
                            <div className="flex items-center gap-2">
                              <a
                                href={`mailto:${m.email}?subject=Re: ${encodeURIComponent(m.subject || 'Portfolio Inquiry')}`}
                                className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-medium bg-white/5 hover:bg-white/10 text-zinc-200 transition-colors"
                              >
                                <Mail className="w-3.5 h-3.5" />
                                <span>Reply</span>
                              </a>
                              <button
                                type="button"
                                onClick={() => handleDeleteMessage(m.id)}
                                className="p-1.5 rounded-lg text-zinc-500 hover:text-rose-400 transition-colors"
                                title="Delete"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

            </div>
          )}
        </div>

        {/* PROJECT CREATE / EDIT SUB-MODAL */}
        {isEditingProject && (
          <div 
            className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in"
            onClick={() => setIsEditingProject(false)}
          >
            <div 
              className="relative w-full max-w-xl glass-card rounded-2xl p-6 border border-white/20 shadow-glass-heavy max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
                <h3 className="text-lg font-display font-bold text-white">
                  {editingProjectId ? 'Edit Project' : 'Create New Project'}
                </h3>
                <button
                  type="button"
                  onClick={() => setIsEditingProject(false)}
                  className="p-1.5 rounded-lg text-zinc-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveProject} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-zinc-300 mb-1">Title *</label>
                  <input
                    type="text"
                    required
                    value={projectForm.title}
                    onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                    placeholder="Project Name"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-background-elevated border border-white/10 text-white text-xs focus:border-electric focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono text-zinc-300 mb-1">Category</label>
                    <select
                      value={projectForm.category}
                      onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-background-elevated border border-white/10 text-white text-xs focus:border-electric focus:outline-none"
                    >
                      <option value="Web Development">Web Development</option>
                      <option value="App Development">App Development</option>
                      <option value="AI & ML">AI & ML</option>
                      <option value="Creative Tech">Creative Tech</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-300 mb-1">Tags (comma separated)</label>
                    <input
                      type="text"
                      value={projectForm.tagsString}
                      onChange={(e) => setProjectForm({ ...projectForm, tagsString: e.target.value })}
                      placeholder="React, TypeScript, Three.js"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-background-elevated border border-white/10 text-white text-xs focus:border-electric focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-300 mb-1">Summary (Short) *</label>
                  <input
                    type="text"
                    required
                    value={projectForm.summary}
                    onChange={(e) => setProjectForm({ ...projectForm, summary: e.target.value })}
                    placeholder="Brief 1-2 sentence overview..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-background-elevated border border-white/10 text-white text-xs focus:border-electric focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-300 mb-1">Detailed Description *</label>
                  <textarea
                    required
                    rows={3}
                    value={projectForm.description}
                    onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                    placeholder="Full problem space, architectural decisions, and technical impact..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-background-elevated border border-white/10 text-white text-xs focus:border-electric focus:outline-none resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono text-zinc-300 mb-1">GitHub URL</label>
                    <input
                      type="url"
                      value={projectForm.githubUrl}
                      onChange={(e) => setProjectForm({ ...projectForm, githubUrl: e.target.value })}
                      placeholder="https://github.com/..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-background-elevated border border-white/10 text-white text-xs focus:border-electric focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-zinc-300 mb-1">Live URL (optional)</label>
                    <input
                      type="text"
                      value={projectForm.liveUrl}
                      onChange={(e) => setProjectForm({ ...projectForm, liveUrl: e.target.value })}
                      placeholder="https://... or #"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-background-elevated border border-white/10 text-white text-xs focus:border-electric focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-6 pt-2">
                  <label className="flex items-center gap-2 text-xs font-mono text-zinc-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={projectForm.published}
                      onChange={(e) => setProjectForm({ ...projectForm, published: e.target.checked })}
                      className="rounded bg-background border-white/20 text-electric focus:ring-0"
                    />
                    <span>Publish to Live Portfolio</span>
                  </label>

                  <label className="flex items-center gap-2 text-xs font-mono text-zinc-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={projectForm.featured}
                      onChange={(e) => setProjectForm({ ...projectForm, featured: e.target.checked })}
                      className="rounded bg-background border-white/20 text-electric focus:ring-0"
                    />
                    <span>Feature on Top</span>
                  </label>
                </div>

                <div className="flex items-center justify-end gap-2 pt-4 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setIsEditingProject(false)}
                    className="px-4 py-2 rounded-xl text-xs font-medium text-zinc-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl text-xs font-semibold bg-electric hover:bg-blue-600 text-white shadow-glow-subtle"
                  >
                    Save Project
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
