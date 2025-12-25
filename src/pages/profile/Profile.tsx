import { useEffect, useState } from 'react';
import { useAuth } from '@/app/providers/AuthProvider';
import { getProfile, updateProfile } from '@/lib/supabase/profile';
import AvatarUploader from '@/components/AvatarUploader';

const ProfilePage = () => {
    const { user } = useAuth();
    const [profile, setProfile] = useState<any>(null);
    const [name, setName] = useState('');
    const [city, setCity] = useState('');
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (!user) return;
        getProfile(user.id).then(p => {
            setProfile(p);
            setName(p?.full_name ?? '');
            setCity(p?.city ?? '');
        });
    }, [user]);

    if (!user || !profile) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin h-8 w-8 border-b-2 border-brand rounded-full" />
            </div>
        );
    }

    const save = async () => {
        setSaving(true);
        await updateProfile(user.id, {
            full_name: name,
            city,
            avatar_url: profile.avatar_url,
        });
        window.location.reload();
        setSaving(false);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-10">
            <div className="max-w-3xl mx-auto px-4">
                {/* Page title */}
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Hồ sơ cá nhân</h1>

                {/* Profile Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                    {/* Avatar section */}
                    <div className="flex items-center gap-6 mb-8">
                        <AvatarUploader
                            userId={user.id}
                            avatarUrl={profile.avatar_url}
                            onUploaded={(url) =>
                                setProfile((p: any) => ({ ...p, avatar_url: url }))
                            }
                        />

                        <div>
                            <p className="text-lg font-semibold text-gray-900">
                                {name || 'User'}
                            </p>
                            <p className="text-sm text-gray-500">
                                Ảnh đại diện hiển thị trên hồ sơ & dashboard
                            </p>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Full name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Họ tên
                            </label>
                            <input
                                value={name}
                                onChange={e => setName(e.target.value)}
                                placeholder="VD: Đàm Tá Thành"
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand focus:border-brand outline-none"
                            />
                        </div>

                        {/* City */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Thành phố
                            </label>
                            <input
                                value={city}
                                onChange={e => setCity(e.target.value)}
                                placeholder="VD: Hồ Chí Minh"
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand focus:border-brand outline-none"
                            />
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-8 flex justify-end">
                        <button
                            onClick={save}
                            disabled={saving}
                            className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold transition disabled:opacity-50"
                        >
                            {saving ? 'Đang lưu...' : 'Lưu thay đổi'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
