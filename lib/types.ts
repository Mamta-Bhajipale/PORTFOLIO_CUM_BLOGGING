export interface Experience {
  role: string;
  org: string;
  location: string;
  period: string;
  bullets: string[];
  isPresent?: boolean;
}

export interface Education {
  degree: string;
  institution: string;
  year?: string;
  result?: string;
}

export interface Project {
  title: string;
  subtitle: string;
  period: string;
  description?: string;
  bullets?: string[];
  reportUrl?: string;
  repoUrl?: string;
  liveUrl?: string;
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface Certification {
  title: string;
  org: string;
  duration?: string;
}

export interface Leadership {
  role: string;
  org: string;
  period: string;
  bullets: string[];
}

export interface CVData {
  name: string;
  initials: string;
  role: string;
  tagline: string;
  location: string;
  email: string;
  phone: string;
  linkedin: string;
  linkedinUrl: string;
  summary: string;
  competencies: string[];
  experience: Experience[];
  education: Education[];
  projects: Project[];
  skills: SkillGroup[];
  certifications: Certification[];
  leadership: Leadership[];
  hobbies: string[];
  awards: string[];
  stats: { value: string; label: string }[];
}
