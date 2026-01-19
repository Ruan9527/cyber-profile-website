export interface Message {
  id: number;
  name: string;
  email: string;
  content: string;
  created_at: string;
  is_approved: boolean;
}

export interface Visitor {
  id: number;
  ip_address: string;
  user_agent: string;
  visit_time: string;
  page_views: number;
}

export interface Download {
  id: number;
  name: string;
  email: string;
  company: string;
  download_time: string;
}

export interface AIChat {
  id: number;
  user_message: string;
  ai_response: string;
  created_at: string;
}

export interface ImageUpload {
  id: number;
  filename: string;
  url: string;
  size: number;
  upload_time: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  bio: string;
  avatar: string;
  email: string;
  github: string;
  linkedin: string;
  twitter: string;
}

export interface Skill {
  name: string;
  level: number;
  category: 'frontend' | 'backend' | 'design' | 'other';
}

export interface Project {
  title: string;
  description: string;
  image: string;
  tech: string[];
  link: string;
  category?: 'frontend' | 'backend' | 'fullstack' | 'ai' | 'design' | 'data' | 'blockchain' | 'game';
}

export interface Stats {
  totalVisitors: number;
  totalMessages: number;
  totalDownloads: number;
  todayVisitors: number;
}