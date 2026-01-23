'use client'

import { useState, useRef } from 'react'
import { Upload, X, Image as ImageIcon, AlertCircle, CheckCircle, Loader } from 'lucide-react'
import StorageService from '@/lib/storageService'

interface ImageUploaderProps {
  onUploadComplete: (url: string) => void
  currentImageUrl?: string
  folder?: string
  maxSizeMB?: number
}

export default function ImageUploader({ 
  onUploadComplete, 
  currentImageUrl = '',
  folder = 'projects',
  maxSizeMB = 5 
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string>(currentImageUrl)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // 验证文件
  const validateFile = (file: File): boolean => {
    setError(null)
    setSuccess(null)

    const validation = StorageService.validateFile(file)
    if (!validation.isValid) {
      setError(validation.error || '文件验证失败')
      return false
    }

    return true
  }

  // 处理文件选择
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!validateFile(file)) {
      return
    }

    // 创建预览URL
    const objectUrl = URL.createObjectURL(file)
    setPreviewUrl(objectUrl)

    // 开始上传
    handleUpload(file)
  }

  // 处理拖放
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()

    const file = e.dataTransfer.files?.[0]
    if (!file) return

    if (!validateFile(file)) {
      return
    }

    // 创建预览URL
    const objectUrl = URL.createObjectURL(file)
    setPreviewUrl(objectUrl)

    // 开始上传
    handleUpload(file)
  }

  // 处理上传
  const handleUpload = async (file: File) => {
    setUploading(true)
    setUploadProgress(0)
    setError(null)
    setSuccess(null)

    try {
      // 验证文件
      const validation = StorageService.validateFile(file)
      if (!validation.isValid) {
        throw new Error(validation.error || '文件验证失败')
      }

      // 模拟上传进度
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 10
        })
      }, 100)

      // 上传文件
      const result = await StorageService.uploadFile(file, folder)

      clearInterval(progressInterval)

      setUploadProgress(100)
      setSuccess('图片上传成功')
      
      // 通知父组件
      onUploadComplete(result.url)

      // 清理预览URL
      if (previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl)
      }

    } catch (err) {
      console.error('图片上传错误:', err)
      setError(err instanceof Error ? err.message : '上传失败')
      
      // 清理预览URL
      if (previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl)
        setPreviewUrl(currentImageUrl)
      }
    } finally {
      setUploading(false)
    }
  }

  // 移除图片
  const handleRemoveImage = () => {
    if (previewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(previewUrl)
    }
    setPreviewUrl('')
    onUploadComplete('')
    setError(null)
    setSuccess(null)
  }

  // 处理拖放事件
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  // 触发文件选择
  const triggerFileSelect = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="space-y-4">
      {/* 文件输入 */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
        disabled={uploading}
      />

      {/* 上传区域 */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={triggerFileSelect}
        className={`relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          uploading 
            ? 'border-cyber-cyan/50 bg-cyber-cyan/10' 
            : 'border-cyber-gray/50 hover:border-cyber-cyan hover:bg-cyber-gray/10'
        }`}
      >
        {uploading ? (
          <div className="space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-cyber-cyan to-cyber-purple rounded-2xl mx-auto">
              <Loader className="w-8 h-8 animate-spin" />
            </div>
            <div>
              <p className="text-cyber-cyan font-medium mb-2">上传中...</p>
              <div className="w-full bg-cyber-black/50 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-cyber-cyan to-cyber-purple h-full rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
              <p className="text-xs text-white/50 mt-2">{uploadProgress}%</p>
            </div>
          </div>
        ) : previewUrl ? (
          <div className="relative">
            <div className="relative h-48 overflow-hidden rounded-lg">
              <img
                src={previewUrl}
                alt="预览"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            <div className="absolute top-4 right-4">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  handleRemoveImage()
                }}
                className="p-2 bg-cyber-red/80 text-white rounded-full hover:bg-cyber-red transition-colors"
                title="移除图片"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-cyber-cyan to-cyber-purple rounded-2xl mx-auto">
              <Upload className="w-8 h-8" />
            </div>
            <div>
              <p className="text-cyber-cyan font-medium mb-2">点击或拖放上传图片</p>
              <p className="text-sm text-white/70">
                支持 JPEG、PNG、WebP、GIF、SVG 格式
              </p>
              <p className="text-xs text-white/50 mt-2">
                最大 {maxSizeMB}MB
              </p>
            </div>
          </div>
        )}
      </div>

      {/* 状态信息 */}
      <div className="space-y-2">
        {error && (
          <div className="flex items-center gap-3 p-3 bg-cyber-red/15 border border-cyber-red/50 rounded-lg">
            <AlertCircle className="w-5 h-5 text-cyber-red flex-shrink-0" />
            <p className="text-sm text-cyber-red">{error}</p>
          </div>
        )}

        {success && (
          <div className="flex items-center gap-3 p-3 bg-cyber-green/15 border border-cyber-green/50 rounded-lg">
            <CheckCircle className="w-5 h-5 text-cyber-green flex-shrink-0" />
            <p className="text-sm text-cyber-green">{success}</p>
          </div>
        )}

        {currentImageUrl && !previewUrl && (
          <div className="text-xs text-white/50">
            <p>当前图片: <a href={currentImageUrl} target="_blank" rel="noopener noreferrer" className="text-cyber-cyan hover:underline">{currentImageUrl}</a></p>
          </div>
        )}
      </div>

      {/* 说明文字 */}
      <div className="text-xs text-white/50">
        <p>📸 图片将上传到 Supabase Storage 的 "{StorageService.BUCKET_NAME}" 存储桶中</p>
        <p>🌐 上传后会自动生成公开访问链接</p>
        <p className="mt-1">⚡ 最大文件大小: {StorageService.MAX_FILE_SIZE / 1024 / 1024}MB</p>
      </div>
    </div>
  )
}