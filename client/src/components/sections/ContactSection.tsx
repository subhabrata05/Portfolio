import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, AlertCircle, Copy, Check, MapPin, MessageSquare, Loader2, Phone, ExternalLink } from 'lucide-react';
import { PROFILE_DATA } from '../../data/portfolioData';
import { submitContactMessage } from '../../services/api';
import { GithubIcon, LinkedinIcon } from '../ui/SocialIcons';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PROFILE_DATA.socials.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      setStatusMessage('Please fill in your name, valid email, and message content.');
      return;
    }

    setStatus('loading');
    setStatusMessage('');

    try {
      const response = await submitContactMessage(formData);
      setStatus('success');
      setStatusMessage(response.message || 'Thank you! Your message has been safely saved.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to submit message. Please try emailing directly.';
      setStatus('error');
      setStatusMessage(msg);
    }
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-8 relative z-10 border-t border-white/5 bg-background-surface/40">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-center sm:items-start mb-16 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-glow text-xs font-mono mb-3">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>06 // INITIATE DIALOGUE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
            Let’s Build Something <span className="gradient-electric">Remarkable</span>
          </h2>
          <p className="mt-4 text-zinc-400 max-w-2xl text-sm sm:text-base leading-relaxed">
            Seeking to bring speed, ownership, and a security-first instinct to an internship, full-time engineering role, or software product collaboration.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Direct Channels & Details */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            <div className="glass-card rounded-2xl p-6 sm:p-7 border border-white/10">
              <span className="text-[11px] font-mono text-electric-light uppercase tracking-wider block mb-2">
                Direct Communication Channels
              </span>
              <h3 className="text-xl font-display font-bold text-white mb-2">
                Subhabrata Dey
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 mb-6 leading-relaxed">
                Full-Stack & App Developer | Cybersecurity Enthusiast based in Jaipur, India. Ready for internships, entry-level engineering roles, and high-impact software builds.
              </p>

              {/* One-click Email Copy Box */}
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="p-2 rounded-lg bg-electric/10 text-electric-light shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <a 
                    href={`mailto:${PROFILE_DATA.socials.email}`}
                    className="text-xs sm:text-sm font-mono text-zinc-200 truncate hover:text-cyan-300 transition-colors"
                  >
                    {PROFILE_DATA.socials.email}
                  </a>
                </div>
                <button
                  type="button"
                  id="contact-copy-email-btn"
                  onClick={handleCopyEmail}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white transition-colors flex items-center gap-1.5 shrink-0"
                  aria-label="Copy email address"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Phone Contact */}
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <a 
                  href={`tel:${PROFILE_DATA.phone}`}
                  className="text-xs sm:text-sm font-mono text-zinc-200 hover:text-emerald-300 transition-colors"
                >
                  {PROFILE_DATA.phone}
                </a>
              </div>

              {/* Location Tag */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-zinc-300 mb-4">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Jaipur, Rajasthan, India (UTC +05:30)</span>
              </div>

              {/* Social Channels Row */}
              <div className="grid grid-cols-2 gap-2 pt-3 border-t border-white/5">
                <a
                  href={PROFILE_DATA.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl glass-card flex items-center justify-center gap-2 text-xs font-mono text-zinc-300 hover:text-white hover:border-electric/40 transition-colors"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>GitHub</span>
                  <ExternalLink className="w-3 h-3 text-zinc-500" />
                </a>

                <a
                  href={PROFILE_DATA.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl glass-card flex items-center justify-center gap-2 text-xs font-mono text-zinc-300 hover:text-white hover:border-electric/40 transition-colors"
                >
                  <LinkedinIcon className="w-4 h-4" />
                  <span>LinkedIn</span>
                  <ExternalLink className="w-3 h-3 text-zinc-500" />
                </a>
              </div>
            </div>

            {/* Status Card */}
            <div className="glass-card rounded-2xl p-6 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-mono font-medium text-emerald-400">Status: Open to Internships & Roles</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Seeking to bring speed, ownership, and a security-first instinct to an internship or entry-level software developer position.
              </p>
            </div>

          </div>

          {/* Interactive Form Panel */}
          <div className="lg:col-span-7 glass-card rounded-2xl p-6 sm:p-8 border border-white/10 relative">
            <h3 className="text-xl font-display font-semibold text-white mb-2">
              Send a Direct Message
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 mb-6">
              Messages are validated on the server and persisted directly into the backend store.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-mono text-zinc-300 mb-1.5">
                    Your Name <span className="text-electric-light">*</span>
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Rivera"
                    className="w-full px-4 py-3 rounded-xl bg-background-elevated/70 border border-white/10 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-electric focus:ring-1 focus:ring-electric transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-xs font-mono text-zinc-300 mb-1.5">
                    Email Address <span className="text-electric-light">*</span>
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-background-elevated/70 border border-white/10 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-electric focus:ring-1 focus:ring-electric transition-colors"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-subject" className="block text-xs font-mono text-zinc-300 mb-1.5">
                  Subject or Topic
                </label>
                <input
                  type="text"
                  id="contact-subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="e.g. Full-Stack / Mobile Developer Role"
                  className="w-full px-4 py-3 rounded-xl bg-background-elevated/70 border border-white/10 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-electric focus:ring-1 focus:ring-electric transition-colors"
                />
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-xs font-mono text-zinc-300 mb-1.5">
                  Your Message <span className="text-electric-light">*</span>
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your inquiry, project scope, or opportunity (at least 10 characters)..."
                  className="w-full px-4 py-3 rounded-xl bg-background-elevated/70 border border-white/10 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-electric focus:ring-1 focus:ring-electric transition-colors resize-none"
                />
              </div>

              {/* Status Notifications */}
              {status === 'success' && (
                <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in duration-200">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                  <span>{statusMessage}</span>
                </div>
              )}

              {status === 'error' && (
                <div className="p-3.5 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2 animate-in fade-in duration-200">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                  <span>{statusMessage}</span>
                </div>
              )}

              <button
                type="submit"
                id="contact-submit-btn"
                disabled={status === 'loading'}
                className="w-full py-4 rounded-xl text-sm font-semibold bg-gradient-to-r from-electric to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-glow-subtle hover:shadow-glow-electric transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Validating & Recording...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Inquiry</span>
                  </>
                )}
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
};
