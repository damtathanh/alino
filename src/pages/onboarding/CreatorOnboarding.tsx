import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/app/providers/AuthProvider';
import { updateProfile } from '@/lib/supabase/profile';
import { profileKeys } from '@/lib/queries/useProfile';
import { ROUTES } from '@/shared/routes';
import type { Profile } from '@/shared/types';
import AvatarUploader from '@/components/AvatarUploader';
import { ErrorBanner } from '@/components/ui/ErrorBanner';
import { handleError } from '@/lib/errors/errorHandler';
import { AppError, ErrorCode } from '@/lib/errors/AppError';
import { hardRedirect } from '@/shared/navigation/hardRedirect';

/* ================== OPTIONS ================== */

const CREATOR_TYPES = [
    'KOL / Influencer',
    'KOC',
    'Streamer',
    'TikToker',
    'YouTuber',
    'Photographer',
    'Blogger',
    'Khác',
];

const PLATFORM_OPTIONS = ['TikTok', 'Facebook', 'Instagram', 'YouTube'];

const CONTENT_CATEGORIES = [
    'Beauty',
    'Fashion',
    'Food',
    'Lifestyle',
    'Tech',
    'Travel',
    'Education',
    'Entertainment',
];

const EXPERIENCE_LEVELS = ['Mới bắt đầu', '1–2 năm', '3–5 năm', 'Trên 5 năm'];

const INCOME_RANGES = [
    '< 5 triệu / tháng',
    '5–20 triệu / tháng',
    '20–50 triệu / tháng',
    '> 50 triệu / tháng',
];

const GOAL_CREATOR = [
    'Tăng booking',
    'Tăng thu nhập',
    'Xây dựng thương hiệu cá nhân',
    'Mở rộng network',
];

const toggle = (arr: string[], v: string) =>
    arr.includes(v) ? arr.filter(x => x !== v) : [...arr, v];

/* ================== COMPONENT ================== */

interface CreatorOnboardingProps {
    profile: Profile;
}

const CreatorOnboarding = ({ profile }: CreatorOnboardingProps) => {
    const { user } = useAuth();
    const queryClient = useQueryClient();

    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    // Common fields
    const [fullName, setFullName] = useState(profile.full_name ?? '');
    const [city, setCity] = useState(profile.city ?? '');
    const [goals, setGoals] = useState<string[]>(profile.goals ?? []);
    const [marketingOptIn, setMarketingOptIn] = useState(profile.marketing_opt_in ?? false);
    const [avatarUrl, setAvatarUrl] = useState(profile.avatar_url ?? null);

    // Creator-specific fields
    const [creatorType, setCreatorType] = useState(profile.creator_type ?? '');
    const [birthYear, setBirthYear] = useState(profile.birth_year ? String(profile.birth_year) : '');
    const [phone, setPhone] = useState(profile.phone ?? '');
    const [gender, setGender] = useState(profile.gender ?? '');
    const [platforms, setPlatforms] = useState<string[]>(profile.platforms ?? []);
    const [categories, setCategories] = useState<string[]>(profile.content_categories ?? []);
    const [experienceLevel, setExperienceLevel] = useState(profile.experience_level ?? '');
    const [incomeRange, setIncomeRange] = useState(profile.income_range ?? '');

    /* ================== SUBMIT ================== */

    const handleSubmit = async () => {
        setError('');

        // Validation
        if (!fullName.trim()) return setError('Vui lòng nhập Họ tên');
        if (!city.trim()) return setError('Vui lòng nhập Thành phố');
        if (goals.length === 0) return setError('Vui lòng chọn ít nhất một Mục tiêu');
        if (!creatorType) return setError('Vui lòng chọn nhóm Creator');
        if (!birthYear) return setError('Vui lòng nhập Năm sinh');
        if (platforms.length === 0) return setError('Vui lòng chọn ít nhất một Nền tảng');
        if (categories.length === 0) return setError('Vui lòng chọn ít nhất một Lĩnh vực');

        setSaving(true);

        try {
            const patch: Partial<Profile> = {
                full_name: fullName,
                city,
                goals,
                marketing_opt_in: marketingOptIn,
                onboarding_completed: true,
                avatar_url: avatarUrl,
                creator_type: creatorType,
                birth_year: Number(birthYear),
                phone,
                email: user?.email ?? '',
                gender,
                platforms,
                content_categories: categories,
                experience_level: experienceLevel,
                income_range: incomeRange,
                updated_at: new Date().toISOString(),
            };

            await updateProfile(user!.id, patch);

            // Invalidate cache để AppGate đọc dữ liệu mới
            queryClient.invalidateQueries({ queryKey: profileKeys.detail(user!.id) });
            // Điều hướng theo flow hiện tại: /app để AppGate quyết định
            hardRedirect(ROUTES.APP);
        } catch (err) {
            const appError = new AppError(
                'Failed to save onboarding data',
                ErrorCode.PROFILE_UPDATE_FAILED,
                undefined,
                err instanceof Error ? err : undefined
            );
            setError(handleError(appError));
            setSaving(false);
        }
    };

    /* ================== RENDER ================== */

    return (
        <div className="max-w-3xl mx-auto p-8 bg-white rounded-2xl mt-10 mb-24 space-y-8">
            {/* Header block with title, subtitle and avatar */}
            <div className="flex items-center justify-between gap-6 pb-2 border-b border-gray-100">
                <div>
                    <h1 className="text-3xl font-bold">Hoàn thiện hồ sơ Creator</h1>
                    <p className="text-gray-500 mt-1">Chỉ mất khoảng 2–3 phút để hoàn tất</p>
                </div>
                <AvatarUploader
                    userId={user!.id}
                    onUploaded={setAvatarUrl}
                >
                    <div className="relative w-20 h-20 rounded-full overflow-hidden cursor-pointer ring-2 ring-gray-200">
                        {avatarUrl ? (
                            <img src={avatarUrl} className="w-full h-full object-cover" alt="Avatar" />
                        ) : (
                            <div className="w-full h-full bg-gray-100 flex items-center justify-center text-lg font-semibold text-gray-500">
                                ?
                            </div>
                        )}
                    </div>
                </AvatarUploader>
            </div>

            {/* BASIC INFO */}
            <section className="bg-gray-50 p-6 rounded-2xl space-y-4 mt-2">
                <h2 className="font-semibold">Thông tin cơ bản</h2>

                <input
                    className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-black"
                    placeholder="Họ và tên *"
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                />

                <input
                    className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-black"
                    placeholder="Thành phố *"
                    value={city}
                    onChange={e => setCity(e.target.value)}
                />

                {/* Email (read-only) */}
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                        Email
                    </label>
                    <input
                        value={user?.email ?? ''}
                        disabled
                        className="w-full px-4 py-3 border rounded-xl bg-gray-100 text-gray-600 cursor-not-allowed"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                        Email dùng để đăng nhập, không thể thay đổi tại đây
                    </p>
                </div>
            </section>

            {/* CREATOR INFO */}
            <section className="bg-gray-50 p-6 rounded-2xl space-y-5">
                <h2 className="font-semibold">Thông tin Creator</h2>

                {/* Creator type */}
                <div className="relative">
                    <select
                        className="w-full px-4 py-3 border rounded-xl bg-white appearance-none focus:ring-2 focus:ring-black"
                        value={creatorType}
                        onChange={e => setCreatorType(e.target.value)}
                    >
                        <option value="">Bạn thuộc nhóm Creator nào?</option>
                        {CREATOR_TYPES.map(x => (
                            <option key={x}>{x}</option>
                        ))}
                    </select>
                    <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                        ▼
                    </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="number"
                        className="w-full px-4 py-3 border rounded-xl"
                        placeholder="Năm sinh *"
                        value={birthYear}
                        onChange={e => setBirthYear(e.target.value)}
                    />

                    <input
                        className="w-full px-4 py-3 border rounded-xl"
                        placeholder="Số điện thoại *"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                    />
                </div>

                <div className="relative">
                    <select
                        className="w-full px-4 py-3 border rounded-xl bg-white appearance-none"
                        value={gender}
                        onChange={e => setGender(e.target.value)}
                    >
                        <option value="">Giới tính</option>
                        <option value="male">Nam</option>
                        <option value="female">Nữ</option>
                        <option value="other">Khác</option>
                    </select>
                    <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                        ▼
                    </span>
                </div>

                {/* Platform */}
                <div>
                    <p className="font-medium mb-2">Nền tảng *</p>
                    <div className="grid grid-cols-2 gap-3">
                        {PLATFORM_OPTIONS.map(p => (
                            <label
                                key={p}
                                className="flex items-center gap-2 p-3 border rounded-xl cursor-pointer hover:bg-gray-100"
                            >
                                <input
                                    type="checkbox"
                                    checked={platforms.includes(p)}
                                    onChange={() => setPlatforms(toggle(platforms, p))}
                                />
                                {p}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Categories */}
                <div>
                    <p className="font-medium mb-2">Lĩnh vực *</p>
                    <div className="grid grid-cols-2 gap-3">
                        {CONTENT_CATEGORIES.map(c => (
                            <label
                                key={c}
                                className="flex items-center gap-2 p-3 border rounded-xl cursor-pointer hover:bg-gray-100"
                            >
                                <input
                                    type="checkbox"
                                    checked={categories.includes(c)}
                                    onChange={() => setCategories(toggle(categories, c))}
                                />
                                {c}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Experience + income */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Kinh nghiệm */}
                    <div>
                        <p className="font-medium mb-3">Kinh nghiệm làm Creator</p>
                        <div className="space-y-3">
                            {EXPERIENCE_LEVELS.map(x => (
                                <label
                                    key={x}
                                    className={`flex items-center gap-3 p-4 border rounded-2xl cursor-pointer transition
                                        ${experienceLevel === x
                                            ? 'border-black bg-white'
                                            : 'border-gray-200 hover:bg-gray-100'
                                        }`}
                                >
                                    <input
                                        type="radio"
                                        name="experience"
                                        checked={experienceLevel === x}
                                        onChange={() => setExperienceLevel(x)}
                                        className="accent-black"
                                    />
                                    <span>{x}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Thu nhập */}
                    <div>
                        <p className="font-medium mb-3">Thu nhập trung bình / tháng</p>
                        <div className="space-y-3">
                            {INCOME_RANGES.map(x => (
                                <label
                                    key={x}
                                    className={`flex items-center gap-3 p-4 border rounded-2xl cursor-pointer transition
                                        ${incomeRange === x
                                            ? 'border-black bg-white'
                                            : 'border-gray-200 hover:bg-gray-100'
                                        }`}
                                >
                                    <input
                                        type="radio"
                                        name="income"
                                        checked={incomeRange === x}
                                        onChange={() => setIncomeRange(x)}
                                        className="accent-black"
                                    />
                                    <span>{x}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* GOALS */}
            <section className="bg-gray-50 p-6 rounded-2xl space-y-5">
                <h2 className="font-semibold text-lg">Mục tiêu *</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {GOAL_CREATOR.map(g => (
                        <label
                            key={g}
                            className={`flex items-center gap-3 p-4 border rounded-2xl cursor-pointer transition
                                ${goals.includes(g)
                                    ? 'border-black bg-white'
                                    : 'border-gray-200 hover:bg-gray-100'
                                }`}
                        >
                            <input
                                type="checkbox"
                                checked={goals.includes(g)}
                                onChange={() => setGoals(toggle(goals, g))}
                                className="accent-black"
                            />
                            <span className="font-medium">{g}</span>
                        </label>
                    ))}
                </div>

                {/* Marketing opt-in */}
                <label className="flex items-center gap-3 pt-2 text-sm text-gray-600">
                    <input
                        type="checkbox"
                        checked={marketingOptIn}
                        onChange={e => setMarketingOptIn(e.target.checked)}
                        className="accent-black"
                    />
                    Tôi đồng ý nhận thông tin marketing
                </label>
            </section>

            {error && <ErrorBanner message={error} />}

            <button
                onClick={handleSubmit}
                disabled={saving}
                className="w-full bg-black text-white py-4 rounded-2xl font-semibold text-lg"
            >
                {saving ? 'Đang lưu...' : 'Hoàn tất và vào Dashboard'}
            </button>
        </div>
    );
};

export default CreatorOnboarding;
