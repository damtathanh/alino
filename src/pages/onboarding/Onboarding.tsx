// src/pages/onboarding/Onboarding.tsx
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/app/providers/AuthProvider';
import { getProfile, updateProfile } from '@/lib/supabase/profile';
import { ROUTES } from '@/shared/routes';
import type { Profile, Role } from '@/shared/types';
import AvatarUploader from '@/components/AvatarUploader';
import { ErrorBanner } from '@/components/ui/ErrorBanner';

/* ================== CONSTANTS ================== */

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

const BRAND_TYPES = [
    'Brand / Nhãn hàng',
    'Agency / Công ty quảng cáo',
    'SME / Doanh nghiệp vừa và nhỏ',
    'Startup',
    'Tập đoàn / Enterprise',
    'Khác',
];

const PLATFORM_OPTIONS = ['TikTok', 'Facebook', 'Instagram', 'YouTube'];
const CONTENT_CATEGORIES = ['Beauty', 'Fashion', 'Food', 'Lifestyle', 'Tech', 'Travel', 'Education', 'Entertainment'];
const GOAL_OPTIONS_CREATOR = ['Tăng booking', 'Tăng thu nhập', 'Xây dựng thương hiệu cá nhân', 'Mở rộng network'];
const GOAL_OPTIONS_BRAND = ['Tìm kiếm Influencer', 'Quảng bá sản phẩm', 'Tăng nhận diện thương hiệu', 'Tăng doanh số'];

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

    // Common fields
    const [fullName, setFullName] = useState('');
    const [city, setCity] = useState('');
    const [goals, setGoals] = useState<string[]>([]);

    // Creator specific
    const [creatorType, setCreatorType] = useState('');
    const [platforms, setPlatforms] = useState<string[]>([]);
    const [categories, setCategories] = useState<string[]>([]);

    // Brand specific
    const [companyName, setCompanyName] = useState('');
    const [companyDomain, setCompanyDomain] = useState('');
    const [companyType, setCompanyType] = useState('');
    const [jobTitle, setJobTitle] = useState('');

    /* ================== LOAD PROFILE ================== */

    useEffect(() => {
        if (!user) return;

        const load = async () => {
            try {
                const p = await getProfile(user.id);
                if (!p) return;

                if (!p.role) {
                    navigate(ROUTES.ONBOARDING_ROLE, { replace: true });
                    return;
                }

                setProfile(p);
                // Load common
                setFullName(p.full_name ?? '');
                setCity(p.city ?? '');
                setGoals(p.goals ?? []);

                // Load Creator
                if (p.role === 'creator') {
                    setCreatorType(p.creator_type ?? '');
                    setPlatforms(p.platforms ?? []);
                    setCategories(p.content_categories ?? []);
                }

                // Load Brand
                if (p.role === 'brand') {
                    setCompanyName(p.company_name ?? '');
                    setCompanyDomain(p.company_domain ?? '');
                    setCompanyType(p.company_type ?? '');
                    setJobTitle(p.job_title ?? '');
                }
            } catch (err) {
                console.error('Error loading profile:', err);
            } finally {
                setLoading(false);
            }
        };

        load();
    }, [user, navigate]);

    const role: Role | null = useMemo(() => profile?.role ?? null, [profile]);
    const goalOptions = role === 'brand' ? GOAL_OPTIONS_BRAND : GOAL_OPTIONS_CREATOR;

    /* ================== SUBMIT ================== */

    const handleSubmit = async () => {
        setError('');

        // Validation Logic
        if (!fullName.trim()) {
            setError('Vui lòng nhập Họ tên');
            return;
        }
        if (!city.trim()) {
            setError('Vui lòng nhập Thành phố');
            return;
        }
        if (goals.length === 0) {
            setError('Vui lòng chọn ít nhất một Mục tiêu');
            return;
        }

        if (role === 'creator') {
            if (!creatorType) {
                setError('Vui lòng chọn Loại Creator');
                return;
            }
            if (platforms.length === 0) {
                setError('Vui lòng chọn ít nhất một Nền tảng');
                return;
            }
            if (categories.length === 0) {
                setError('Vui lòng chọn ít nhất một Lĩnh vực');
                return;
            }
        }

        if (role === 'brand') {
            if (!companyName.trim()) {
                setError('Vui lòng nhập Tên công ty');
                return;
            }
            if (!companyDomain.trim()) {
                setError('Vui lòng nhập Website công ty (Domain)');
                return;
            }
            if (!companyType) {
                setError('Vui lòng chọn Loại hình công ty');
                return;
            }
            if (!jobTitle.trim()) {
                setError('Vui lòng nhập Chức vụ của bạn');
                return;
            }
        }

        setSaving(true);

        try {
            const patch: Partial<Profile> = {
                full_name: fullName.trim(),
                city: city.trim(),
                goals,
                onboarding_completed: true,
                avatar_url: profile?.avatar_url ?? null,
                updated_at: new Date().toISOString(),
            };

            if (role === 'creator') {
                patch.creator_type = creatorType;
                patch.platforms = platforms;
                patch.content_categories = categories;
            }

            if (role === 'brand') {
                patch.company_name = companyName.trim();
                patch.company_domain = companyDomain.trim();
                patch.company_type = companyType;
                patch.job_title = jobTitle.trim();
            }

            await updateProfile(user!.id, patch);
            navigate(ROUTES.APP, { replace: true });
        } catch (err) {
            console.error(err);
            setError('Có lỗi xảy ra khi lưu hồ sơ. Vui lòng thử lại.');
        } finally {
            setSaving(false);
        }
    };

    /* ================== RENDER ================== */

    if (!user || loading) {
        return (
            <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    return (
        <div className="max-w-xl mx-auto p-6 bg-white shadow-sm rounded-xl mt-4 mb-20">
            <h1 className="text-2xl font-bold mb-2 text-gray-900">Hoàn thiện hồ sơ {role === 'brand' ? 'Brand' : 'Creator'}</h1>
            <p className="text-gray-500 mb-6">Thông tin này giúp chúng tôi cá nhân hóa trải nghiệm của bạn</p>

            <AvatarUploader
                userId={user.id}
                avatarUrl={profile?.avatar_url}
                onUploaded={(url) =>
                    setProfile(prev => (prev ? { ...prev, avatar_url: url } : prev))
                }
            />
            <p className="text-xs text-center text-gray-400 mt-2 mb-6">Ảnh đại diện (Không bắt buộc)</p>

            <ErrorBanner message={error} />

            <div className="space-y-4">
                {/* Common Fields */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Họ và tên <span className="text-red-500">*</span></label>
                    <input
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition"
                        placeholder="Nhập họ tên của bạn"
                        value={fullName}
                        onChange={e => setFullName(e.target.value)}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Thành phố <span className="text-red-500">*</span></label>
                    <input
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition"
                        placeholder="Ví dụ: TP. Hồ Chí Minh"
                        value={city}
                        onChange={e => setCity(e.target.value)}
                    />
                </div>

                {/* Brand Specific Fields */}
                {role === 'brand' && (
                    <>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Tên công ty <span className="text-red-500">*</span></label>
                            <input
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition"
                                placeholder="Nhập tên công ty"
                                value={companyName}
                                onChange={e => setCompanyName(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Website (Domain) <span className="text-red-500">*</span></label>
                            <input
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition"
                                placeholder="example.com"
                                value={companyDomain}
                                onChange={e => setCompanyDomain(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Loại hình công ty <span className="text-red-500">*</span></label>
                            <select
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition bg-white"
                                value={companyType}
                                onChange={e => setCompanyType(e.target.value)}
                            >
                                <option value="">Chọn loại hình</option>
                                {BRAND_TYPES.map(x => (
                                    <option key={x} value={x}>{x}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Chức vụ <span className="text-red-500">*</span></label>
                            <input
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition"
                                placeholder="Ví dụ: Marketing Manager"
                                value={jobTitle}
                                onChange={e => setJobTitle(e.target.value)}
                            />
                        </div>
                    </>
                )}

                {/* Creator Specific Fields */}
                {role === 'creator' && (
                    <>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Bạn là ai? <span className="text-red-500">*</span></label>
                            <select
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition bg-white"
                                value={creatorType}
                                onChange={e => setCreatorType(e.target.value)}
                            >
                                <option value="">Chọn loại Creator</option>
                                {CREATOR_TYPES.map(x => (
                                    <option key={x} value={x}>{x}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Nền tảng hoạt động <span className="text-red-500">*</span></label>
                            <div className="grid grid-cols-2 gap-2">
                                {PLATFORM_OPTIONS.map(p => (
                                    <label key={p} className="flex items-center space-x-2 p-2 border rounded-lg cursor-pointer hover:bg-gray-50">
                                        <input
                                            type="checkbox"
                                            className="form-checkbox text-black rounded"
                                            checked={platforms.includes(p)}
                                            onChange={() => setPlatforms(toggle(platforms, p))}
                                        />
                                        <span>{p}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Lĩnh vực nội dung <span className="text-red-500">*</span></label>
                            <div className="grid grid-cols-2 gap-2">
                                {CONTENT_CATEGORIES.map(c => (
                                    <label key={c} className="flex items-center space-x-2 p-2 border rounded-lg cursor-pointer hover:bg-gray-50">
                                        <input
                                            type="checkbox"
                                            className="form-checkbox text-black rounded"
                                            checked={categories.includes(c)}
                                            onChange={() => setCategories(toggle(categories, c))}
                                        />
                                        <span>{c}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </>
                )}

                {/* Goals */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Mục tiêu chính <span className="text-red-500">*</span></label>
                    <div className="space-y-2">
                        {goalOptions.map(g => (
                            <label key={g} className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    className="form-checkbox text-black rounded"
                                    checked={goals.includes(g)}
                                    onChange={() => setGoals(toggle(goals, g))}
                                />
                                <span>{g}</span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>

            <button
                disabled={saving}
                onClick={handleSubmit}
                className="mt-8 w-full bg-black hover:bg-gray-800 text-white font-semibold py-3 rounded-lg shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {saving ? 'Đang lưu...' : 'Hoàn tất'}
            </button>
        </div>
    );
};

export default Onboarding;
