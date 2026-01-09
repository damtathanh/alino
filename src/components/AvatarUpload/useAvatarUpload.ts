import { useState, useRef } from 'react'
import { Area } from 'react-easy-crop'
import { getSupabase } from '../../lib/supabase'
import { getCroppedImg } from '../../utils/cropImage'

const CROP_SIZE = 300
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/webp']

export interface UseAvatarUploadOptions {
  userId: string
  onUploadComplete: (url: string) => void
}

export interface UseAvatarUploadReturn {
  // State
  imageSrc: string | null
  showCropModal: boolean
  crop: { x: number; y: number }
  zoom: number
  uploading: boolean
  
  // Refs
  fileInputRef: React.RefObject<HTMLInputElement>
  
  // Handlers
  handleFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleCropComplete: (croppedArea: Area, croppedAreaPixels: Area) => void
  handleCrop: () => Promise<void>
  handleCancel: () => void
  setCrop: (crop: { x: number; y: number }) => void
  setZoom: (zoom: number) => void
}

/**
 * useAvatarUpload: Handles avatar upload logic including validation, cropping, and upload
 * 
 * Responsibilities:
 * - File validation (type, size)
 * - Image cropping state management
 * - Supabase storage upload
 * - State management for upload flow
 */
export function useAvatarUpload({ userId, onUploadComplete }: UseAvatarUploadOptions): UseAvatarUploadReturn {
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [showCropModal, setShowCropModal] = useState(false)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)
  const [uploading, setUploading] = useState(false)
  
  const fileInputRef = useRef<HTMLInputElement>(null)

  const validateFile = (file: File): string | null => {
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      return 'Chỉ hỗ trợ JPG, PNG, WEBP'
    }
    
    if (file.size > MAX_FILE_SIZE) {
      return 'Ảnh tối đa 5MB'
    }
    
    return null
  }

  const resetCropState = () => {
    setImageSrc(null)
    setCrop({ x: 0, y: 0 })
    setZoom(1)
    setCroppedAreaPixels(null)
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const validationError = validateFile(file)
    if (validationError) {
      alert(validationError)
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      setImageSrc(reader.result as string)
      setShowCropModal(true)
      setCrop({ x: 0, y: 0 })
      setZoom(1)
    }
    reader.readAsDataURL(file)
  }

  const handleCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }

  const handleCrop = async () => {
    if (!imageSrc || !croppedAreaPixels) return

    setUploading(true)

    try {
      // Get cropped image blob
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels)
      
      if (!croppedImage) {
        throw new Error('Không thể crop ảnh')
      }

      // Upload to Supabase Storage
      const supabase = getSupabase()
      const timestamp = Date.now()
      const fileExt = 'jpg'
      const path = `${userId}/${timestamp}.${fileExt}`

      // Upload file to storage
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(path, croppedImage, {
          upsert: true,
          contentType: 'image/jpeg',
        })

      if (uploadError) {
        throw new Error(`Upload failed: ${uploadError.message}`)
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('avatars')
        .getPublicUrl(path)

      if (!urlData?.publicUrl) {
        throw new Error('Failed to get public URL')
      }

      // Notify parent component
      onUploadComplete(urlData.publicUrl)

      // Close modal and reset
      setShowCropModal(false)
      resetCropState()
    } catch (error: any) {
      console.error('Avatar upload error:', error)
      alert(error.message || 'Upload thất bại')
      // Reset state on error
      setShowCropModal(false)
      resetCropState()
    } finally {
      setUploading(false)
    }
  }

  const handleCancel = () => {
    setShowCropModal(false)
    resetCropState()
  }

  return {
    imageSrc,
    showCropModal,
    crop,
    zoom,
    uploading,
    fileInputRef,
    handleFileSelect,
    handleCropComplete,
    handleCrop,
    handleCancel,
    setCrop,
    setZoom,
  }
}

export { CROP_SIZE }
