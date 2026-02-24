// 创建演示用户的脚本（使用service role key）
const fs = require('fs');
const path = require('path');

// 读取.env.local文件
const envPath = path.join(__dirname, '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const envLines = envContent.split('\n');

let supabaseUrl = '';
let serviceRoleKey = '';

envLines.forEach(line => {
  const [key, value] = line.split('=');
  if (key === 'NEXT_PUBLIC_SUPABASE_URL') {
    supabaseUrl = value;
  } else if (key === 'SUPABASE_SERVICE_ROLE_KEY') {
    serviceRoleKey = value;
  }
});

console.log('Supabase URL:', supabaseUrl);
console.log('Service Role Key exists:', !!serviceRoleKey);

// 检查URL是否为默认值
const isDefaultUrl = supabaseUrl === 'your_supabase_url_here';
console.log('是否使用默认URL:', isDefaultUrl);

const { createClient } = require('@supabase/supabase-js');

if (supabaseUrl && serviceRoleKey && !isDefaultUrl) {
  console.log('✓ 环境变量已配置');

  // 使用service role key创建admin客户端
  const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });

  // 创建演示用户
  console.log('创建演示用户...');
  supabaseAdmin.auth.admin.createUser({
    email: 'admin@example.com',
    password: 'password',
    email_confirm: true  // 自动确认邮箱
  }).then(({ data, error }) => {
    if (error) {
      if (error.message.includes('already registered')) {
        console.log('✓ 用户已存在');
      } else {
        console.error('❌ 创建用户失败:', error.message);
      }
    } else {
      console.log('✓ 用户创建成功');
      console.log('用户ID:', data.user?.id);
      console.log('邮箱已确认，可以直接登录');
    }

    // 测试查询技能
    return supabaseAdmin
      .from('skills')
      .select('*')
      .limit(3);
  }).then(({ data, error }) => {
    if (error) {
      console.error('❌ Supabase查询错误:', error.message);
    } else {
      console.log('✓ Supabase连接成功');
      console.log('获取到技能数据:', data?.length || 0, '条');
      if (data && data.length > 0) {
        console.log('第一条技能:', data[0].name);
      }
    }
  }).catch(err => {
    console.error('❌ 操作失败:', err.message);
  });
} else {
  console.log('⚠️ 环境变量未配置或使用默认值');
  if (isDefaultUrl) {
    console.log('请更新.env.local文件中的Supabase URL和Key');
  }
}