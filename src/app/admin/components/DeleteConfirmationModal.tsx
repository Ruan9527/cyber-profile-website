'use client'

import { AlertTriangle } from 'lucide-react'

interface DeleteConfirmationModalProps {
  title: string
  message: string
  onConfirm: () => void
  onCancel: () => void
}

export default function DeleteConfirmationModal({
  title,
  message,
  onConfirm,
  onCancel
}: DeleteConfirmationModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="cyber-card border-cyber-red/30 w-full max-w-md">
        {/* 模态框头部 */}
        <div className="flex items-center gap-3 p-6 border-b border-cyber-red/30">
          <div className="p-2 bg-cyber-red/15 rounded-lg">
            <AlertTriangle className="w-6 h-6 text-cyber-red" />
          </div>
          <h2 className="text-xl font-bold text-cyber-red">{title}</h2>
        </div>

        {/* 模态框内容 */}
        <div className="p-6">
          <p className="text-white/80 mb-6">{message}</p>
          
          <div className="flex gap-3">
            <button
              onClick={onCancel}
              className="flex-1 cyber-button bg-cyber-gray border-cyber-gray hover:bg-cyber-cyan hover:border-cyber-cyan"
            >
              取消
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 cyber-button bg-cyber-red border-cyber-red hover:bg-cyber-red/80 hover:border-cyber-red/80"
            >
              确认删除
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}