import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../app/providers/AuthProvider';
import { getProfile, markOnboardingDone, updateProfile } from '../../lib/supabase/profile';
import { getMissingFields, isProfileComplete } from '../../lib/profileCompleteness';
import { ROUTES } from '../../shared/routes';
import type { Profile } from '../../shared/types';
import { ErrorBanner } from '../../components/ui/ErrorBanner';

const Onboarding = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string>('');

    // Minimal fields for MVP
    const [fullName, setFullName] = useState('');
    const [city, setCity] = useState('');
    const [birthYear, setBirthYear] = useState<string>(''); // creator
    const [companyName, setCompanyName] = useState(''); // brand

    useEffect(() => {
        const load = async () => {
            if (!user) return;
            setLoading(true);
            try {
                const data = await getProfile(user.id);
                setProfile(data);

                if (data && !data.role) {
                    navigate(ROUTES.ONBOARDING_ROLE, { replace: true });
                    return;
                }

                // hydrate inputs
                setFullName(data?.full_name ?? '');
                setCity(data?.city ?? '');
                setBirthYear(data?.birth_year ? String(data.birth_year) : '');
                setCompanyName(data?.company_name ?? '');
            } catch {
                // ignore
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [user, navigate]);

    useEffect(() => {
        if (profile && isProfileComplete(profile)) {
            navigate(ROUTES.APP, { replace: true });
        }
    }, [profile, navigate]);

    const role = profile?.role ?? null;

    const missing = useMemo(() => getMissingFields(profile), [profile]);

    const handleSaveMinimal = async () => {
        if (!user || !profile) return;
        setSaving(true);
        setErrorMsg('');

        try {
            const patch: Partial<Profile> = {
                full_name: fullName || null,
                city: city || null,
            };

            if (role === 'creator') {
                patch.birth_year = birthYear ? Number(birthYear) : null;
            }

            if (role === 'brand') {
                patch.company_name = companyName || null;
            }

            const updated = await updateProfile(user.id, patch);
            setProfile(updated);
        } catch (err: any) {
            setErrorMsg(err?.message || 'Lưu thất bại. Thử lại nhé.');
        } finally {
            setSaving(false);
        }
    };

    const handleMarkDone = async () => {
        if (!user || !profile) return;
        setSaving(true);
        setErrorMsg('');

        try {
            const updated = await markOnboardingDone(user.id);
            setProfile(updated);
        } catch (err: any) {
            const miss = getMissingFields(profile);
            setErrorMsg(`Chưa thể hoàn tất. Vui lòng điền: ${miss.join(', ')}`);
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-bg">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-bg p-6">
            <div className="max-w-2xl mx-auto bg-white border border-border rounded-2xl p-6 shadow-sm">
                <h1 className="text-2xl font-bold text-primary mb-2">Hoàn tất hồ sơ (MVP)</h1>
                <p className="text-secondary mb-6">
                    Điền vài field tối thiểu để test flow. Sau này mình mở rộng form đầy đủ.
                </p>

                <ErrorBanner message={errorMsg} onClose={() => setErrorMsg('')} />

                <div className="grid gap-4 mb-6">
                    <div>
                        <label className="block text-sm font-medium text-primary mb-1">Họ tên</label>
                        <input
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand focus:border-brand outline-none"
                            placeholder="VD: Nguyễn Văn A"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-primary mb-1">Thành phố</label>
                        <input
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand focus:border-brand outline-none"
                            placeholder="VD: Hồ Chí Minh"
                        />
                    </div>

                    {role === 'creator' && (
                        <div>
                            <label className="block text-sm font-medium text-primary mb-1">Năm sinh</label>
                            <input
                                value={birthYear}
                                onChange={(e) => setBirthYear(e.target.value)}
                                inputMode="numeric"
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand focus:border-brand outline-none"
                                placeholder="VD: 1998"
                            />
                        </div>
                    )}

                    {role === 'brand' && (
                        <div>
                            <label className="block text-sm font-medium text-primary mb-1">Tên công ty</label>
                            <input
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand focus:border-brand outline-none"
                                placeholder="VD: Alino Media"
                            />
                        </div>
                    )}
                </div>

                <div className="bg-gray-50 border border-border rounded-xl p-4 mb-6">
                    <div className="font-semibold mb-2">Thiếu các trường (theo rule hiện tại):</div>
                    <ul className="list-disc ml-5 text-sm text-secondary">
                        {missing.map((m) => (
                            <li key={m}>{m}</li>
                        ))}
                    </ul>
                </div>

                <div className="flex flex-col gap-3">
                    <button
                        onClick={handleSaveMinimal}
                        disabled={saving}
                        className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 rounded-xl disabled:opacity-50"
                    >
                        {saving ? 'Đang lưu...' : 'Lưu info tối thiểu'}
                    </button>

                    <button
                        onClick={handleMarkDone}
                        disabled={saving}
                        className="w-full bg-brand hover:bg-brandHover text-white font-semibold py-3 rounded-xl disabled:opacity-50"
                    >
                        {saving ? 'Đang lưu...' : 'Set onboarding_completed=true'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Onboarding;
