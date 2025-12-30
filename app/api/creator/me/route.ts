import { getServices } from '@/lib/container';
import { ok, fail } from '@/lib/api-response';

/**
 * Get current creator profile
 * GET /api/creator/me
 */
export async function GET() {
  try {
    const { authRepository, creatorRepository } = getServices();

    // Get current session
    const session = await authRepository.getSession();

    if (!session) {
      return fail('Bạn chưa đăng nhập', 401);
    }

    // Get creator profile by user ID
    const creator = await creatorRepository.getByUserId(session.user.id);

    if (!creator) {
      return ok(null, 'Chưa có hồ sơ creator');
    }

    return ok(creator, 'Lấy hồ sơ creator thành công');
  } catch (error) {
    console.error('Error getting creator profile:', error);
    return fail('Có lỗi xảy ra khi lấy hồ sơ creator', 500, error);
  }
}

