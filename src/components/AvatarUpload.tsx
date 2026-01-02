import { useState, useRef } from 'react'
import Cropper, { Area } from 'react-easy-crop'
import { getSupabase } from '../lib/supabase'
import { getCroppedImg } from '../utils/cropImage'

interface AvatarUploadProps {
  currentAvatarUrl?: string
  onAvatarChange: (url: string) => void
  userId: string
}

const CROP_SIZE = 300 // Fixed crop circle size

export default function AvatarUpload({
  currentAvatarUrl,
  onAvatarChange,
  userId,
}: AvatarUploadProps) {
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [showCropModal, setShowCropModal] = useState(false)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)
  const [uploading, setUploading] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)

  /* ================= FILE SELECT ================= */

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      alert('Chỉ hỗ trợ JPG, PNG, WEBP')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Ảnh tối đa 5MB')
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

  /* ================= CROP + UPLOAD ================= */

  const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
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

      // Upload to Supabase
      const supabase = getSupabase()
      const path = `avatars/${userId}-${Date.now()}.jpg`

      await supabase.storage.from('avatars').upload(path, croppedImage, {
        upsert: true,
      })

      const { data } = supabase.storage.from('avatars').getPublicUrl(path)
      onAvatarChange(data.publicUrl)

      // Close modal and reset
      setShowCropModal(false)
      setImageSrc(null)
      setCrop({ x: 0, y: 0 })
      setZoom(1)
      setCroppedAreaPixels(null)
    } catch (error: any) {
      alert(error.message || 'Upload thất bại')
    } finally {
      setUploading(false)
    }
  }

  const handleCancel = () => {
    setShowCropModal(false)
    setImageSrc(null)
    setCrop({ x: 0, y: 0 })
    setZoom(1)
    setCroppedAreaPixels(null)
  }

  /* ================= RENDER ================= */

  return (
    <>
      {/* AVATAR */}
      <div className="flex flex-col items-center gap-2">
        <div
          onClick={() => fileInputRef.current?.click()}
          className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-200 cursor-pointer group"
        >
          {currentAvatarUrl ? (
            <img src={currentAvatarUrl} alt="Avatar" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-4xl">
              👤
            </div>
          )}

          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
            <span className="text-white text-xs font-medium">Đổi avatar</span>
          </div>
        </div>

        <button
          onClick={() => fileInputRef.current?.click()}
          className="text-sm text-indigo-600 hover:underline"
        >
          Thay đổi avatar
        </button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={handleFileSelect}
      />

      {/* MODAL */}
      {showCropModal && imageSrc && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div 
            className="bg-white rounded-xl p-5 w-full"
            style={{ 
              maxWidth: '400px',
              maxHeight: '90vh',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <h3 className="font-semibold mb-4 flex-shrink-0">Chỉnh sửa avatar</h3>

            {/* Crop Area - Compact, centered */}
            <div
              className="relative mx-auto flex-shrink-0"
              style={{
                width: `${CROP_SIZE}px`,
                height: `${CROP_SIZE}px`,
                backgroundColor: '#000',
              }}
            >
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={1}
                cropShape="round"
                showGrid={true}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
                style={{
                  containerStyle: {
                    width: '100%',
                    height: '100%',
                  },
                }}
              />
            </div>

            {/* Zoom Control - Directly below crop */}
            <div className="mt-4 mb-4 flex-shrink-0" style={{ width: `${CROP_SIZE}px`, marginLeft: 'auto', marginRight: 'auto' }}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Zoom
              </label>
              <input
                type="range"
                min="1"
                max="3"
                step="0.1"
                value={zoom}
                onChange={(e) => setZoom(parseFloat(e.target.value))}
                className="w-full"
              />
            </div>

            {/* Buttons - Always visible */}
            <div className="flex justify-end gap-2 mt-auto flex-shrink-0">
              <button
                onClick={handleCancel}
                disabled={uploading}
                className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium disabled:opacity-50"
              >
                Hủy
              </button>
              <button
                onClick={handleCrop}
                disabled={uploading}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-medium disabled:opacity-50"
              >
                {uploading ? 'Đang lưu…' : 'Lưu'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
