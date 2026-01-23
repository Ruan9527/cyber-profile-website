-- Supabase SQL设置管理员角色
-- 在Supabase SQL编辑器中运行此脚本

-- 1. 创建profiles表存储用户角色信息
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  role TEXT DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2. 设置RLS策略
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 允许用户查看自己的profile
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

-- 允许用户更新自己的profile
CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- 允许管理员查看所有profiles
CREATE POLICY "Admins can view all profiles" ON public.profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- 3. 创建skills表的RLS策略（允许认证用户CRUD）
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;

-- 允许认证用户查看所有技能
CREATE POLICY "Authenticated users can view skills" ON public.skills
  FOR SELECT USING (auth.role() = 'authenticated');

-- 允许认证用户插入技能
CREATE POLICY "Authenticated users can insert skills" ON public.skills
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- 允许认证用户更新技能
CREATE POLICY "Authenticated users can update skills" ON public.skills
  FOR UPDATE USING (auth.role() = 'authenticated');

-- 允许认证用户删除技能
CREATE POLICY "Authenticated users can delete skills" ON public.skills
  FOR DELETE USING (auth.role() = 'authenticated');

-- 4. 为admin@example.com设置管理员角色
-- 先插入profile记录
INSERT INTO public.profiles (id, email, role)
SELECT id, email, 'admin'
FROM auth.users
WHERE email = 'admin@example.com'
ON CONFLICT (id) DO UPDATE SET
  role = 'admin',
  updated_at = TIMEZONE('utc'::text, NOW());

-- 5. 创建函数自动为新用户创建profile
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role)
  VALUES (NEW.id, NEW.email, 'user');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 创建触发器
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();