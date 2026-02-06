import { Metadata } from 'next'
import AdminNavbar from './components/AdminNavbar'
import AdminSidebar from './components/AdminSidebar'
import AuthGuard from './components/AuthGuard'

export const metadata: Metadata = {
  title: '管理后台 - 赛博朋克个人网站',
  description: '技能和项目管理后台',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-br from-cyber-black via-cyber-gray/10 to-cyber-black text-white">
        <AdminNavbar />
        <div className="flex pt-16">
          <AdminSidebar />
          <main className="flex-1 p-6 md:p-8 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </AuthGuard>
  )
}