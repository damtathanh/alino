import { getServices } from '@/lib/container';
import { ok, fail } from '@/lib/api-response';

/**
 * List brand requests for current creator
 * GET /api/brand-requests
 */
export async function GET() {
  try {
    const { authRepository, creatorRepository, brandRequestRepository } =
      getServices();

    // Get current session
    const session = await authRepository.getSession();

    if (!session) {
      return fail('Bạn chưa đăng nhập', 401);
    }

    // Get creator profile
    const creator = await creatorRepository.getByUserId(session.user.id);

    if (!creator) {
      return fail('Chưa có hồ sơ creator', 404);
    }

    // List brand requests for this creator
    const brandRequests = await brandRequestRepository.listByCreatorId(
      creator.id
    );

    return ok(brandRequests, 'Lấy danh sách yêu cầu hợp tác thành công');
  } catch (error) {
    console.error('Error listing brand requests:', error);
    return fail('Có lỗi xảy ra khi lấy danh sách yêu cầu hợp tác', 500, error);
  }
}

