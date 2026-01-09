import { Area } from 'react-easy-crop'

/**
 * cropImage: Utility functions for image cropping operations
 * 
 * Handles canvas-based image cropping with circular output.
 */

// Constants
const OUTPUT_SIZE = 400
const JPEG_QUALITY = 0.9
const JPEG_MIME_TYPE = 'image/jpeg'

/**
 * Creates an HTMLImageElement from a data URL or image source
 * 
 * @param url - Image source URL or data URL
 * @returns Promise that resolves to loaded HTMLImageElement
 */
function createImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.addEventListener('load', () => resolve(image))
    image.addEventListener('error', (error) => reject(error))
    image.src = url
  })
}

/**
 * Crops an image to a circular output using canvas
 * 
 * @param imageSrc - Source image URL or data URL
 * @param pixelCrop - Crop area in pixels from react-easy-crop
 * @returns Promise that resolves to cropped image as Blob
 * @throws Error if canvas context is unavailable or canvas is empty
 */
export async function getCroppedImg(
  imageSrc: string,
  pixelCrop: Area
): Promise<Blob> {
  const image = await createImage(imageSrc)
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  if (!ctx) {
    throw new Error('No 2d context')
  }

  // Set canvas size to output size (circular crop)
  canvas.width = OUTPUT_SIZE
  canvas.height = OUTPUT_SIZE

  // Draw circular crop
  ctx.save()
  ctx.beginPath()
  ctx.arc(OUTPUT_SIZE / 2, OUTPUT_SIZE / 2, OUTPUT_SIZE / 2, 0, Math.PI * 2)
  ctx.clip()

  // Draw cropped image
  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    OUTPUT_SIZE,
    OUTPUT_SIZE
  )

  ctx.restore()

  // Convert canvas to blob
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error('Canvas is empty'))
          return
        }
        resolve(blob)
      },
      JPEG_MIME_TYPE,
      JPEG_QUALITY
    )
  })
}
