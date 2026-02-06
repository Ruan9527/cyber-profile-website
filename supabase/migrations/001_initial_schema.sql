-- Initial schema for Cyberpunk Personal Website
-- Creates tables for skills and projects with RLS policies

-- Skills table
CREATE TABLE IF NOT EXISTS skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    level INTEGER NOT NULL CHECK (level >= 0 AND level <= 100),
    category TEXT NOT NULL CHECK (category IN ('it_ops', 'ai')),
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    image TEXT NOT NULL,
    tech JSONB NOT NULL DEFAULT '[]'::JSONB,
    link TEXT NOT NULL,
    category TEXT CHECK (category IN ('it_ops', 'ai', 'data', 'backend', 'fullstack')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_skills_category ON skills(category);
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);
CREATE INDEX IF NOT EXISTS idx_projects_tech ON projects USING GIN (tech);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
DROP TRIGGER IF EXISTS update_skills_updated_at ON skills;
CREATE TRIGGER update_skills_updated_at
    BEFORE UPDATE ON skills
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_projects_updated_at ON projects;
CREATE TRIGGER update_projects_updated_at
    BEFORE UPDATE ON projects
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Allow public read access, no write access
CREATE POLICY "Allow public read access for skills"
    ON skills FOR SELECT
    USING (true);

CREATE POLICY "Allow public read access for projects"
    ON projects FOR SELECT
    USING (true);

-- Insert seed data for skills
INSERT INTO skills (name, level, category, description) VALUES
    ('Linux/Unix', 90, 'it_ops', '系统管理与脚本编写'),
    ('Docker', 85, 'it_ops', '容器化部署与管理'),
    ('Kubernetes', 80, 'it_ops', '容器编排与集群管理'),
    ('AWS/Cloud', 75, 'it_ops', '云基础设施与管理'),
    ('CI/CD', 85, 'it_ops', '持续集成与部署流水线'),
    ('监控与告警', 80, 'it_ops', '系统监控与告警配置'),
    ('网络安全', 70, 'it_ops', '网络防护与安全策略'),
    ('自动化运维', 85, 'it_ops', '运维自动化脚本与工具'),
    ('Python', 90, 'ai', '数据科学与机器学习'),
    ('TensorFlow', 80, 'ai', '深度学习框架'),
    ('PyTorch', 75, 'ai', '深度学习研究框架'),
    ('OpenAI API', 85, 'ai', 'GPT模型集成与应用'),
    ('MLOps', 70, 'ai', '机器学习运维流程'),
    ('数据可视化', 80, 'ai', '数据探索与可视化工具'),
    ('自然语言处理', 75, 'ai', 'NLP模型与文本分析'),
    ('计算机视觉', 70, 'ai', '图像识别与处理')
ON CONFLICT DO NOTHING;

-- Insert seed data for projects
INSERT INTO projects (title, description, image, tech, link, category) VALUES
    (
        'Kubernetes Cluster Management Platform',
        'Enterprise-grade Kubernetes management platform with automated scaling, monitoring, and security compliance for cloud-native infrastructure.',
        '/placeholder-project1.jpg',
        '["Kubernetes", "Helm", "Prometheus", "Grafana", "AWS"]',
        'https://github.com/project1',
        'it_ops'
    ),
    (
        'AI-Powered Monitoring System',
        'Intelligent monitoring system using machine learning to predict infrastructure failures and automate incident response.',
        '/placeholder-project2.jpg',
        '["Python", "TensorFlow", "FastAPI", "Docker", "Redis"]',
        'https://github.com/project2',
        'ai'
    ),
    (
        'Data Pipeline Automation Platform',
        'Automated data pipeline orchestration tool for ETL processes, real-time streaming, and data quality monitoring.',
        '/placeholder-project3.jpg',
        '["Apache Airflow", "Python", "PostgreSQL", "Kafka", "Snowflake"]',
        'https://github.com/project3',
        'data'
    ),
    (
        'Cloud Infrastructure as Code',
        'Infrastructure automation using Terraform and Ansible for multi-cloud deployment, with CI/CD integration and compliance checks.',
        '/placeholder-project4.jpg',
        '["Terraform", "Ansible", "AWS", "GitLab CI", "Python"]',
        'https://github.com/project4',
        'backend'
    ),
    (
        'Full-Stack DevOps Dashboard',
        'Comprehensive DevOps dashboard providing real-time insights into deployments, system health, and team performance metrics.',
        '/placeholder-project5.jpg',
        '["Next.js", "Supabase", "Tailwind CSS", "Docker", "GitHub Actions"]',
        'https://github.com/project5',
        'fullstack'
    ),
    (
        'ML Model Deployment Platform',
        'End-to-end machine learning model deployment platform with version control, A/B testing, and performance monitoring.',
        '/placeholder-project6.jpg',
        '["Python", "FastAPI", "Docker", "MLflow", "Kubernetes"]',
        'https://github.com/project6',
        'ai'
    ),
    (
        'Network Security Scanner',
        'Automated network security scanner for vulnerability assessment, penetration testing, and compliance reporting.',
        '/placeholder-project1.jpg',
        '["Python", "Nmap", "ELK Stack", "React", "PostgreSQL"]',
        'https://github.com/project7',
        'it_ops'
    ),
    (
        'Real-time Data Analytics Dashboard',
        'Real-time analytics dashboard for business intelligence with interactive visualizations and predictive analytics.',
        '/placeholder-project2.jpg',
        '["React", "D3.js", "WebSocket", "Node.js", "MongoDB"]',
        'https://github.com/project8',
        'data'
    )
ON CONFLICT DO NOTHING;