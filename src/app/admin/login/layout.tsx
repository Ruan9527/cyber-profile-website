import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '登录 - 管理后台',
  description: '赛博朋克个人网站管理后台登录',
}

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen">
      {children}
    </div>
  )
}