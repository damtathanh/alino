import { supabase } from '@/lib/supabase/client';

export async function uploadUserAvatar(userId: string, blob: Blob): Promise<string> {
  const path = `${userId}/avatar.png`;

  const { error } = await supabase.storage
    .from('avatars')
    .upload(path, blob, {
      upsert: true,
      contentType: 'image/png',
    });

  if (error) {
    throw new Error(error.message);
  }

  const { data } = supabase.storage
    .from('avatars')
    .getPublicUrl(path);

  const freshUrl = `${data.publicUrl}?t=${Date.now()}`;
  return freshUrl;
}
