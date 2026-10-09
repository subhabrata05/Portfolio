export interface SocialLinks {
  github: string;
  linkedin: string;
  email: string;
  phone?: string;
  instagram?: string;
  twitter?: string;
}

export interface ProfilePillar {
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
}

export interface ProfileInfo {
  name: string;
  title: string;
  tagline: string;
  institution: string;
  degree: string;
  location: string;
  phone: string;
  bio: string;
  pillars: ProfilePillar[];
  socials: SocialLinks;
}

export interface ProjectItem {
  id: string;
  title: string;
  slug: string;
  summary: string;
  description: string;
  architectureHighlights?: string[];
  role?: string;
  category: 'Web Development' | 'App Development' | 'AI & ML' | 'Creative Tech';
  tags: string[];
  featured: boolean;
  githubUrl?: string;
  liveUrl?: string;
  accentColor?: string;
}

export interface CreativeItem {
  id: string;
  title: string;
  category: 'Photography' | 'Video Editing' | 'Creative Technology';
  caption: string;
  mediaUrl: string;
  tag: string;
  dimensions?: string;
  gearNotes?: string;
}

export interface SkillCategory {
  title: string;
  description: string;
  iconName: string;
  skills: {
    name: string;
    level: string;
    highlight?: boolean;
  }[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  location: string;
  score?: string;
  description: string;
  focus?: string;
  keyCourses?: string[];
  status: string;
}

export interface JourneyMilestone {
  year: string;
  period: string;
  title: string;
  category: 'Academics' | 'Engineering' | 'Creative Tech' | 'Product & AI' | 'Leadership' | 'Achievements';
  subtitle: string;
  description: string;
  tags: string[];
  iconName: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}
