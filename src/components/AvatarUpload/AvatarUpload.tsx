import Cropper from 'react-easy-crop'
import { useAvatarUpload, CROP_SIZE } from './useAvatarUpload'

interface AvatarUploadProps {
  currentAvatarUrl?: string
  onAvatarChange: (url: string) => void
  userId: string
}

/**
 * AvatarUpload: Presentational component for avatar upload UI
 * 
 * Responsibilities:
 * - Renders avatar display and upload UI
 * - Renders crop modal UI
 * - Delegates all upload logic to useAvatarUpload hook
 */
export default function AvatarUpload({
  currentAvatarUrl,
  onAvatarChange,
  userId,
}: AvatarUploadProps) {
  const {
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
  } = useAvatarUpload({
    userId,
    onUploadComplete: onAvatarChange,
  })

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
        <div className="fixed inset-0 z-50 bg-black/60 flex justify-center p-4">
          <div
            className="bg-white rounded-xl p-5 w-full"
            style={{
              maxWidth: '400px',
              maxHeight: '80vh',
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
                onCropComplete={handleCropComplete}
                style={{
                  containerStyle: {
                    width: '100%',
                    height: '100%',
                  },
                }}
              />
            </div>

            {/* Zoom Control - Directly below crop */}
            <div
              className="mt-4 mb-4 flex-shrink-0"
              style={{ width: `${CROP_SIZE}px`, marginLeft: 'auto', marginRight: 'auto' }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">Zoom</label>
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
            <div className="flex justify-end gap-2 mt-3 flex-shrink-0">
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
