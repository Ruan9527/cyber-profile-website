'use client'

export default function XiaohongshuIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* 小红书Logo - 官方红色 */}
      <rect
        x="2.5"
        y="2.5"
        width="19"
        height="19"
        rx="3.5"
        fill="#FF2442"
        stroke="#FF2442"
        strokeWidth="1.5"
      />
      {/* 中间的白色圆圈 */}
      <circle
        cx="12"
        cy="12"
        r="3.5"
        fill="white"
      />
      {/* 右上角的白色圆点 */}
      <circle
        cx="17.5"
        cy="6.5"
        r="1.5"
        fill="white"
      />
    </svg>
  )
}