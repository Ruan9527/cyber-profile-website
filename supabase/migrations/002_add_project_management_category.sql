-- Migration: Add project_management category to skills
-- Execute this in Supabase SQL Editor

-- Update the category CHECK constraint to include project_management
ALTER TABLE public.skills DROP CONSTRAINT IF EXISTS skills_category_check;
ALTER TABLE public.skills ADD CONSTRAINT skills_category_check
    CHECK (category IN ('it_ops', 'ai', 'project_management'));

-- Insert project management skills
INSERT INTO public.skills (name, level, category, description) VALUES
    ('敏捷/Scrum', 85, 'project_management', 'Sprint规划与迭代管理'),
    ('进度管理', 85, 'project_management', '里程碑规划与进度跟踪'),
    ('需求分析', 80, 'project_management', 'PRD撰写与需求管理'),
    ('跨团队协调', 80, 'project_management', '跨部门协作与干系人管理'),
    ('质量管理', 80, 'project_management', 'QA流程与测试策略'),
    ('风险管理', 75, 'project_management', '风险评估与应急预案'),
    ('资源调配', 75, 'project_management', '团队资源规划与分配'),
    ('成本管理', 70, 'project_management', '项目预算控制与成本分析')
ON CONFLICT DO NOTHING;
