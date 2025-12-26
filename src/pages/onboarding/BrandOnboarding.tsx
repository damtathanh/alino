import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

/* ================== OPTIONS ================== */

const BRAND_TYPES = [
    'Brand / Nhãn hàng',
    'Agency / Công ty quảng cáo',
    'SME / Doanh nghiệp vừa và nhỏ',
    'Startup',
    'Enterprise',
];

const TEAM_SIZE_RANGES = ['1–5', '6–20', '21–50', '50+'];
const BUDGET_RANGES = [
    '< 20 triệu',
    '20–100 triệu',
    '100–500 triệu',
    '> 500 triệu',
];
const CAMPAIGN_FREQUENCY = ['1–2', '3–5', '6–10', '10+'];

const GOAL_BRAND = [
    'Tìm kiếm Influencer',
    'Quảng bá sản phẩm',
    'Tăng nhận diện thương hiệu',
    'Tăng doanh số',
];

const toggle = (arr: string[], v: string) =>
    arr.includes(v) ? arr.filter(x => x !== v) : [...arr, v];

/* ================== COMPONENT ================== */

interface BrandOnboardingProps {
    profile: Profile;
}

const BrandOnboarding = ({ profile }: BrandOnboardingProps) => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    // Common fields
    const [fullName, setFullName] = useState(profile.full_name ?? '');
    const [city, setCity] = useState(profile.city ?? '');
    const [goals, setGoals] = useState<string[]>(profile.goals ?? []);
    const [marketingOptIn, setMarketingOptIn] = useState(profile.marketing_opt_in ?? false);
    const [avatarUrl, setAvatarUrl] = useState(profile.avatar_url ?? null);

    // Brand-specific fields
    const [companyName, setCompanyName] = useState(profile.company_name ?? '');
    const [companyDomain, setCompanyDomain] = useState(profile.company_domain ?? '');
    const [companyType, setCompanyType] = useState(profile.company_type ?? '');
    const [jobTitle, setJobTitle] = useState(profile.job_title ?? '');
    const [phone, setPhone] = useState(profile.phone ?? '');
    const [industry, setIndustry] = useState(profile.industry ?? '');
    const [teamSize, setTeamSize] = useState(profile.team_size_range ?? '');
    const [budgetRange, setBudgetRange] = useState(profile.budget_range ?? '');
    const [campaignsPerMonth, setCampaignsPerMonth] = useState(profile.campaigns_per_month ?? '');

    /* ================== SUBMIT ================== */

    const handleSubmit = async () => {
        setError('');

        // Validation
        if (!fullName.trim()) return setError('Vui lòng nhập Họ tên');
        if (!city.trim()) return setError('Vui lòng nhập Thành phố');
        if (goals.length === 0) return setError('Vui lòng chọn ít nhất một Mục tiêu');
        if (!companyName.trim()) return setError('Vui lòng nhập Tên công ty');
        if (!companyDomain.trim()) return setError('Vui lòng nhập Website công ty');
        if (!companyType) return setError('Vui lòng chọn Loại hình công ty');
        if (!jobTitle.trim()) return setError('Vui lòng nhập Chức vụ');

        setSaving(true);

        try {
            const patch: Partial<Profile> = {
                full_name: fullName,
                city,
                goals,
                marketing_opt_in: marketingOptIn,
                onboarding_completed: true,
                avatar_url: avatarUrl,
                company_name: companyName,
                company_domain: companyDomain,
                company_type: companyType,
                job_title: jobTitle,
                phone,
                email: user?.email ?? '',
                industry,
                team_size_range: teamSize,
                budget_range: budgetRange,
                campaigns_per_month: campaignsPerMonth,
                updated_at: new Date().toISOString(),
            };

            await updateProfile(user!.id, patch);

            // ROOT FIX 2 & 3: Invalidate cache + delay để đảm bảo AppGate fetch fresh
            queryClient.invalidateQueries({ queryKey: profileKeys.detail(user!.id) });
            await new Promise(resolve => setTimeout(resolve, 200));

            // ROOT FIX 2: Navigate /app để AppGate quyết định
            navigate(ROUTES.APP, { replace: true });
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
                    <h1 className="text-3xl font-bold">Hoàn thiện hồ sơ Brand</h1>
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

            {/* BRAND INFO */}
            <section className="bg-gray-50 p-6 rounded-2xl space-y-5">
                <h2 className="font-semibold">Thông tin Brand</h2>

                <input
                    className="w-full px-4 py-3 border rounded-xl"
                    placeholder="Tên công ty *"
                    value={companyName}
                    onChange={e => setCompanyName(e.target.value)}
                />

                <input
                    className="w-full px-4 py-3 border rounded-xl"
                    placeholder="Website công ty *"
                    value={companyDomain}
                    onChange={e => setCompanyDomain(e.target.value)}
                />

                <input
                    className="w-full px-4 py-3 border rounded-xl"
                    placeholder="Số điện thoại liên hệ *"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                />

                <div className="relative">
                    <select
                        className="w-full px-4 py-3 border rounded-xl bg-white appearance-none"
                        value={companyType}
                        onChange={e => setCompanyType(e.target.value)}
                    >
                        <option value="">Loại hình công ty *</option>
                        {BRAND_TYPES.map(x => (
                            <option key={x}>{x}</option>
                        ))}
                    </select>
                    <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                        ▼
                    </span>
                </div>

                <input
                    className="w-full px-4 py-3 border rounded-xl"
                    placeholder="Chức vụ *"
                    value={jobTitle}
                    onChange={e => setJobTitle(e.target.value)}
                />

                <input
                    className="w-full px-4 py-3 border rounded-xl"
                    placeholder="Ngành nghề"
                    value={industry}
                    onChange={e => setIndustry(e.target.value)}
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="relative">
                        <select
                            className="w-full px-4 py-3 border rounded-xl bg-white appearance-none"
                            value={teamSize}
                            onChange={e => setTeamSize(e.target.value)}
                        >
                            <option value="">Quy mô team</option>
                            {TEAM_SIZE_RANGES.map(x => (
                                <option key={x}>{x}</option>
                            ))}
                        </select>
                        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                            ▼
                        </span>
                    </div>

                    <div className="relative">
                        <select
                            className="w-full px-4 py-3 border rounded-xl bg-white appearance-none"
                            value={budgetRange}
                            onChange={e => setBudgetRange(e.target.value)}
                        >
                            <option value="">Ngân sách</option>
                            {BUDGET_RANGES.map(x => (
                                <option key={x}>{x}</option>
                            ))}
                        </select>
                        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                            ▼
                        </span>
                    </div>

                    <div className="relative">
                        <select
                            className="w-full px-4 py-3 border rounded-xl bg-white appearance-none"
                            value={campaignsPerMonth}
                            onChange={e => setCampaignsPerMonth(e.target.value)}
                        >
                            <option value="">Chiến dịch / tháng</option>
                            {CAMPAIGN_FREQUENCY.map(x => (
                                <option key={x}>{x}</option>
                            ))}
                        </select>
                        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                            ▼
                        </span>
                    </div>
                </div>
            </section>

            {/* GOALS */}
            <section className="bg-gray-50 p-6 rounded-2xl space-y-5">
                <h2 className="font-semibold text-lg">Mục tiêu *</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {GOAL_BRAND.map(g => (
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
                {saving ? 'Đang lưu...' : 'Hoàn tất & vào Dashboard'}
            </button>
        </div>
    );
};

export default BrandOnboarding;
