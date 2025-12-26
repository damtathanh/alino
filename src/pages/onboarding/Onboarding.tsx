import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/app/providers/AuthProvider';
import { getProfile, updateProfile } from '@/lib/supabase/profile';
import { ROUTES } from '@/shared/routes';
import type { Profile, Role } from '@/shared/types';
import AvatarUploader from '@/components/AvatarUploader';
import { ErrorBanner } from '@/components/ui/ErrorBanner';

/* ================== OPTIONS ================== */

// Creator
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

// Brand
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

const GOAL_CREATOR = [
    'Tăng booking',
    'Tăng thu nhập',
    'Xây dựng thương hiệu cá nhân',
    'Mở rộng network',
];

const GOAL_BRAND = [
    'Tìm kiếm Influencer',
    'Quảng bá sản phẩm',
    'Tăng nhận diện thương hiệu',
    'Tăng doanh số',
];

const toggle = (arr: string[], v: string) =>
    arr.includes(v) ? arr.filter(x => x !== v) : [...arr, v];

/* ================== COMPONENT ================== */

const Onboarding = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    // Common
    const [fullName, setFullName] = useState('');
    const [city, setCity] = useState('');
    const [goals, setGoals] = useState<string[]>([]);
    const [marketingOptIn, setMarketingOptIn] = useState(false);

    // Creator
    const [creatorType, setCreatorType] = useState('');
    const [birthYear, setBirthYear] = useState('');
    const [phone, setPhone] = useState('');
    const [gender, setGender] = useState('');
    const [platforms, setPlatforms] = useState<string[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [experienceLevel, setExperienceLevel] = useState('');
    const [incomeRange, setIncomeRange] = useState('');

    // Brand
    const [companyName, setCompanyName] = useState('');
    const [companyDomain, setCompanyDomain] = useState('');
    const [companyType, setCompanyType] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [industry, setIndustry] = useState('');
    const [teamSize, setTeamSize] = useState('');
    const [budgetRange, setBudgetRange] = useState('');
    const [campaignsPerMonth, setCampaignsPerMonth] = useState('');

    /* ================== LOAD ================== */

    useEffect(() => {
        if (!user) return;

        const load = async () => {
            const p = await getProfile(user.id);
            if (!p?.role) {
                navigate(ROUTES.ONBOARDING_ROLE, { replace: true });
                return;
            }

            setProfile(p);
            setFullName(p.full_name ?? '');
            setCity(p.city ?? '');
            setGoals(p.goals ?? []);
            setMarketingOptIn(p.marketing_opt_in ?? false);

            if (p.role === 'creator') {
                setCreatorType(p.creator_type ?? '');
                setBirthYear(p.birth_year ? String(p.birth_year) : '');
                setPhone(p.phone ?? '');
                setGender(p.gender ?? '');
                setPlatforms(p.platforms ?? []);
                setCategories(p.content_categories ?? []);
                setExperienceLevel(p.experience_level ?? '');
                setIncomeRange(p.income_range ?? '');
            }

            if (p.role === 'brand') {
                setCompanyName(p.company_name ?? '');
                setCompanyDomain(p.company_domain ?? '');
                setCompanyType(p.company_type ?? '');
                setJobTitle(p.job_title ?? '');
                setIndustry(p.industry ?? '');
                setTeamSize(p.team_size_range ?? '');
                setBudgetRange(p.budget_range ?? '');
                setCampaignsPerMonth(p.campaigns_per_month ?? '');
            }

            setLoading(false);
        };

        load();
    }, [user, navigate]);

    const role: Role | null = useMemo(() => profile?.role ?? null, [profile]);
    const goalOptions = role === 'brand' ? GOAL_BRAND : GOAL_CREATOR;

    /* ================== SUBMIT ================== */

    const handleSubmit = async () => {
        setError('');

        if (!fullName.trim()) return setError('Vui lòng nhập Họ tên');
        if (!city.trim()) return setError('Vui lòng nhập Thành phố');

        if (goals.length === 0)
            return setError('Vui lòng chọn ít nhất một Mục tiêu');

        if (role === 'creator') {
            if (!creatorType) return setError('Vui lòng chọn loại Creator');
            if (!birthYear) return setError('Vui lòng nhập Năm sinh');
            if (platforms.length === 0)
                return setError('Vui lòng chọn ít nhất một Nền tảng');
            if (categories.length === 0)
                return setError('Vui lòng chọn ít nhất một Lĩnh vực');
        }

        if (role === 'brand') {
            if (!companyName.trim())
                return setError('Vui lòng nhập Tên công ty');
            if (!companyDomain.trim())
                return setError('Vui lòng nhập Website công ty');
            if (!companyType)
                return setError('Vui lòng chọn Loại hình công ty');
            if (!jobTitle.trim())
                return setError('Vui lòng nhập Chức vụ');
        }

        setSaving(true);

        try {
            const patch: Partial<Profile> = {
                full_name: fullName,
                city,
                goals,
                marketing_opt_in: marketingOptIn,
                onboarding_completed: true,
                avatar_url: profile?.avatar_url ?? null,
                updated_at: new Date().toISOString(),
            };

            if (role === 'creator') {
                Object.assign(patch, {
                    creator_type: creatorType,
                    birth_year: Number(birthYear),
                    phone,
                    email: user?.email ?? '',
                    gender,
                    platforms,
                    content_categories: categories,
                    experience_level: experienceLevel,
                    income_range: incomeRange,
                });
            }

            if (role === 'brand') {
                Object.assign(patch, {
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
                });
            }

            await updateProfile(user!.id, patch);
            navigate(ROUTES.APP, { replace: true });

        } catch (err) {
            setError('Không thể lưu thông tin. Vui lòng thử lại.');
            setSaving(false);
        }
    };

    /* ================== RENDER ================== */

    if (!user || loading) {
        return (
            <div className="flex justify-center py-20">
                <div className="animate-spin h-8 w-8 border-b-2 border-black" />
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto p-8 bg-white rounded-2xl mt-10 mb-24 space-y-8">
            <h1 className="text-3xl font-bold">
                Hoàn thiện hồ sơ {role === 'brand' ? 'Brand' : 'Creator'}
            </h1>

            <p className="text-gray-500 mt-2">
                Chỉ mất khoảng 2–3 phút để hoàn tất.
            </p>

            {/* PROGRESS */}
            <div className="mt-6 mb-8">
                <div className="flex items-center gap-4 text-sm font-medium text-gray-500">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center">
                            1
                        </div>
                        Thông tin cơ bản
                    </div>

                    <div className="h-px flex-1 bg-gray-200" />

                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center">
                            2
                        </div>
                        {role === 'brand' ? 'Thông tin Brand' : 'Thông tin Creator'}
                    </div>
                </div>
            </div>

            <AvatarUploader
                userId={user.id}
                onUploaded={url =>
                    setProfile(p => (p ? { ...p, avatar_url: url } : p))
                }
            >
                <div className="relative w-24 h-24 rounded-full overflow-hidden cursor-pointer">
                    {profile?.avatar_url ? (
                        <img
                            src={profile.avatar_url}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-xl font-semibold text-gray-600">
                            ?
                        </div>
                    )}
                </div>
            </AvatarUploader>

            {/* BASIC INFO */}
            <section className="bg-gray-50 p-6 rounded-2xl space-y-4">
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

            {/* CREATOR */}
            {role === 'creator' && (
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
            )}

            {/* BRAND */}
            {role === 'brand' && (
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
            )}

            {/* GOALS */}
            <section className="bg-gray-50 p-6 rounded-2xl space-y-5">
                <h2 className="font-semibold text-lg">Mục tiêu *</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {goalOptions.map(g => (
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

                {/* Marketing opt-in tách riêng */}
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

export default Onboarding;
