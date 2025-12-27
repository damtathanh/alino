import { useState } from 'react';
import { useAuth } from '@/app/providers/AuthProvider';
import { useUpdateProfile } from '@/lib/queries/useProfile';
import type { Profile } from '@/shared/types';
import Toast from '@/components/ui/Toast';
import { handleError } from '@/lib/errors/errorHandler';
import { ProfileField } from '@/shared/constants/enums';

import {
    CREATOR_TYPES,
    EXPERIENCE_LEVELS,
    INCOME_RANGES,
} from '@/shared/constants/profileOptions';

import ProfileHeader from './sections/ProfileHeader';
import SectionCard from './sections/SectionCard';

const CreatorProfile = ({ profile }: { profile: Profile }) => {
    const { user } = useAuth();
    const updateProfileMutation = useUpdateProfile(user!.id);

    /* ===== STATE ===== */
    const [fullName, setFullName] = useState(profile.full_name ?? '');
    const [city, setCity] = useState(profile.city ?? '');
    const [phone, setPhone] = useState(profile.phone ?? '');
    const [gender, setGender] = useState(profile.gender ?? '');
    const [birthYear, setBirthYear] = useState(
        profile.birth_year ? String(profile.birth_year) : ''
    );
    const [avatarUrl, setAvatarUrl] = useState(profile.avatar_url ?? null);

    const [creatorType, setCreatorType] = useState(profile.creator_type ?? '');
    const [experience, setExperience] = useState(profile.experience_level ?? '');
    const [income, setIncome] = useState(profile.income_range ?? '');
    const [goals] = useState(profile.goals ?? []);

    const [showToast, setShowToast] = useState(false);
    const [fieldError, setFieldError] = useState<string | null>(null);

    const scrollTo = (id: string) => {
        document.getElementById(id)?.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
        });
    };

    const save = async () => {
        setFieldError(null);
        setShowToast(false);

        const checks: [string, boolean][] = [
            [ProfileField.FULL_NAME, !fullName.trim()],
            [ProfileField.CITY, !city.trim()],
            [ProfileField.PHONE, !phone.trim()],
            [ProfileField.GENDER, !gender],
            [ProfileField.BIRTH_YEAR, !birthYear],
            [ProfileField.CREATOR_TYPE, !creatorType],
            [ProfileField.EXPERIENCE, !experience],
            [ProfileField.INCOME, !income],
            [ProfileField.GOALS, !goals || goals.length === 0],
        ];

        for (const [field, invalid] of checks) {
            if (invalid) {
                setFieldError(field);
                scrollTo(field);
                return;
            }
        }

        try {
            await updateProfileMutation.mutateAsync({
                full_name: fullName,
                city,
                phone,
                avatar_url: avatarUrl,
                gender,
                birth_year: Number(birthYear),
                creator_type: creatorType,
                experience_level: experience,
                income_range: income,
                goals,
            });

            setShowToast(true);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (err) {
            const errorMessage = handleError(err);
            alert(errorMessage); // Simple error display
        }
    };

    const ErrorText = ({ show, text }: { show: boolean; text: string }) =>
        show ? <p className="text-sm text-red-600 mt-1">{text}</p> : null;

    return (
        <div id="top" className="min-h-screen bg-gray-50 py-10">
            <div className="max-w-4xl mx-auto px-4 space-y-8">

                <ProfileHeader
                    userId={user!.id}
                    avatarUrl={avatarUrl}
                    name={fullName || 'Creator'}
                    subtitle="Trang cá nhân Creator"
                    onAvatarChange={setAvatarUrl}
                />

                {showToast && (
                    <Toast
                        message="Đã lưu thay đổi thành công"
                        onClose={() => setShowToast(false)}
                    />
                )}

                <SectionCard title="Thông tin cá nhân">
                    <Field id="fullName" label="Họ và tên" error={fieldError === 'fullName'}>
                        <input className="input" value={fullName} onChange={e => setFullName(e.target.value)} />
                        <ErrorText show={fieldError === 'fullName'} text="Vui lòng nhập Họ và tên" />
                    </Field>

                    <Field id="city" label="Thành phố" error={fieldError === 'city'}>
                        <input className="input" value={city} onChange={e => setCity(e.target.value)} />
                        <ErrorText show={fieldError === 'city'} text="Vui lòng nhập Thành phố" />
                    </Field>

                    <Field id="phone" label="Số điện thoại" error={fieldError === 'phone'}>
                        <input className="input" value={phone} onChange={e => setPhone(e.target.value)} />
                        <ErrorText show={fieldError === 'phone'} text="Vui lòng nhập Số điện thoại" />
                    </Field>

                    <Field id="gender" label="Giới tính" error={fieldError === 'gender'}>
                        <select className="input bg-white" value={gender} onChange={e => setGender(e.target.value)}>
                            <option value="">Chọn giới tính</option>
                            <option value="male">Nam</option>
                            <option value="female">Nữ</option>
                            <option value="other">Khác</option>
                        </select>
                        <ErrorText show={fieldError === 'gender'} text="Vui lòng chọn Giới tính" />
                    </Field>

                    <Field id="birthYear" label="Năm sinh" error={fieldError === 'birthYear'}>
                        <input
                            type="number"
                            className="input"
                            value={birthYear}
                            onChange={e => setBirthYear(e.target.value)}
                        />
                        <ErrorText show={fieldError === 'birthYear'} text="Vui lòng nhập Năm sinh" />
                    </Field>

                    <Field label="Email">
                        <input className="input bg-gray-100" disabled value={user?.email ?? ''} />
                    </Field>
                </SectionCard>

                <SectionCard title="Thông tin Creator">
                    <Field id="creatorType" label="Loại Creator" error={fieldError === 'creatorType'}>
                        <select className="input bg-white" value={creatorType} onChange={e => setCreatorType(e.target.value)}>
                            <option value="">Chọn nhóm Creator</option>
                            {CREATOR_TYPES.map(t => <option key={t}>{t}</option>)}
                        </select>
                        <ErrorText show={fieldError === 'creatorType'} text="Vui lòng chọn nhóm Creator" />
                    </Field>

                    <div id="experience">
                        <RadioGroup label="Kinh nghiệm" value={experience} options={EXPERIENCE_LEVELS} onChange={setExperience} />
                        <ErrorText show={fieldError === 'experience'} text="Vui lòng chọn Kinh nghiệm" />
                    </div>

                    <div id="income">
                        <RadioGroup label="Thu nhập trung bình / tháng" value={income} options={INCOME_RANGES} onChange={setIncome} />
                        <ErrorText show={fieldError === 'income'} text="Vui lòng chọn Thu nhập" />
                    </div>
                </SectionCard>

                <SectionCard title="Mục tiêu">
                    <div id="goals">
                        <div className="flex flex-wrap gap-2">
                            {goals.map(g => (
                                <span key={g} className="px-3 py-1 rounded-full bg-brandSoft text-brand text-sm">
                                    {g}
                                </span>
                            ))}
                        </div>
                        <ErrorText show={fieldError === 'goals'} text="Vui lòng chọn ít nhất một Mục tiêu" />
                    </div>
                </SectionCard>

                <div className="flex justify-end">
                    <button onClick={save} disabled={updateProfileMutation.isPending} className="px-6 py-3 bg-brand text-white rounded-xl">
                        {updateProfileMutation.isPending ? 'Đang lưu...' : 'Lưu thay đổi'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreatorProfile;

/* ===== HELPERS ===== */

const Field = ({
    id,
    label,
    error,
    children,
}: {
    id?: string;
    label: string;
    error?: boolean;
    children: React.ReactNode;
}) => (
    <div id={id} className="space-y-1">
        <label className="text-sm font-medium text-muted">{label}</label>
        <div className={error ? 'border-red-500' : ''}>{children}</div>
    </div>
);

const RadioGroup = ({
    label,
    value,
    options,
    onChange,
}: {
    label: string;
    value: string;
    options: string[];
    onChange: (v: string) => void;
}) => (
    <div className="space-y-2">
        <label className="text-sm font-medium text-muted">{label}</label>
        <div className="grid grid-cols-2 gap-3">
            {options.map(opt => (
                <label key={opt} className="flex items-center gap-2 p-3 border rounded-xl cursor-pointer">
                    <input type="radio" checked={value === opt} onChange={() => onChange(opt)} />
                    {opt}
                </label>
            ))}
        </div>
    </div>
);
