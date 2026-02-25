

export interface PersonalInfo {
  name: string;
  title: string;
  bio: string;
  avatar: string;
  email: string;
  github: string;
  xiaohongshu: string;
}

export interface Skill {
  name: string;
  level: number;
  category: 'it_ops' | 'ai' | 'project_management' | 'healthcare_it';
  description?: string;
}

export interface Project {
  title: string;
  description: string;
  image: string;
  tech: string[];
  link: string;
  category?: 'it_ops' | 'ai' | 'data' | 'backend' | 'fullstack' | 'healthcare_it';
}

export interface Stats {
  totalVisitors: number;
  totalMessages: number;
  totalDownloads: number;
  todayVisitors: number;
}