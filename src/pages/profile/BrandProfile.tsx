import { useState } from 'react';
import { useAuth } from '@/app/providers/AuthProvider';
import { useUpdateProfile } from '@/lib/queries/useProfile';
import type { Profile } from '@/shared/types';
import Toast from '@/components/ui/Toast';

import {
    COMPANY_TYPES,
    TEAM_SIZES,
} from '@/shared/constants/profileOptions';

import ProfileHeader from './sections/ProfileHeader';
import SectionCard from './sections/SectionCard';

const BrandProfile = ({ profile }: { profile: Profile }) => {
    const { user } = useAuth();
    const updateProfileMutation = useUpdateProfile(user!.id);

    /* ===== STATE ===== */
    const [companyName, setCompanyName] = useState(profile.company_name ?? '');
    const [domain, setDomain] = useState(profile.company_domain ?? '');
    const [companyType, setCompanyType] = useState(profile.company_type ?? '');
    const [teamSize, setTeamSize] = useState(profile.team_size_range ?? '');

    const [contactName, setContactName] = useState(profile.full_name ?? '');
    const [jobTitle, setJobTitle] = useState(profile.job_title ?? '');
    const [phone, setPhone] = useState(profile.phone ?? '');
    const [avatarUrl, setAvatarUrl] = useState(profile.avatar_url ?? null);

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
            ['companyName', !companyName.trim()],
            ['domain', !domain.trim()],
            ['companyType', !companyType],
            ['teamSize', !teamSize],
            ['contactName', !contactName.trim()],
            ['jobTitle', !jobTitle.trim()],
            ['phone', !phone.trim()],
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
                full_name: contactName,
                company_name: companyName,
                company_domain: domain,
                company_type: companyType,
                team_size_range: teamSize,
                job_title: jobTitle,
                phone,
                avatar_url: avatarUrl,
            });

            setShowToast(true);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (error) {
            console.error('Error updating profile:', error);
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
                    name={companyName || 'Brand'}
                    subtitle="Trang thông tin Brand"
                    onAvatarChange={setAvatarUrl}
                />

                {showToast && (
                    <Toast
                        message="Đã lưu thay đổi thành công"
                        onClose={() => setShowToast(false)}
                    />
                )}

                <SectionCard title="Thông tin doanh nghiệp">
                    <Field id="companyName" label="Tên công ty" error={fieldError === 'companyName'}>
                        <input className="input" value={companyName} onChange={e => setCompanyName(e.target.value)} />
                        <ErrorText show={fieldError === 'companyName'} text="Vui lòng nhập Tên công ty" />
                    </Field>

                    <Field id="domain" label="Website" error={fieldError === 'domain'}>
                        <input className="input" value={domain} onChange={e => setDomain(e.target.value)} />
                        <ErrorText show={fieldError === 'domain'} text="Vui lòng nhập Website" />
                    </Field>

                    <Field id="companyType" label="Loại hình công ty" error={fieldError === 'companyType'}>
                        <select className="input bg-white" value={companyType} onChange={e => setCompanyType(e.target.value)}>
                            <option value="">Chọn loại hình</option>
                            {COMPANY_TYPES.map(t => <option key={t}>{t}</option>)}
                        </select>
                        <ErrorText show={fieldError === 'companyType'} text="Vui lòng chọn Loại hình công ty" />
                    </Field>

                    <div id="teamSize">
                        <RadioGroup label="Quy mô team" value={teamSize} options={TEAM_SIZES} onChange={setTeamSize} />
                        <ErrorText show={fieldError === 'teamSize'} text="Vui lòng chọn Quy mô team" />
                    </div>
                </SectionCard>

                <SectionCard title="Người phụ trách">
                    <Field id="contactName" label="Người liên hệ" error={fieldError === 'contactName'}>
                        <input className="input" value={contactName} onChange={e => setContactName(e.target.value)} />
                        <ErrorText show={fieldError === 'contactName'} text="Vui lòng nhập Người liên hệ" />
                    </Field>

                    <Field id="jobTitle" label="Chức vụ" error={fieldError === 'jobTitle'}>
                        <input className="input" value={jobTitle} onChange={e => setJobTitle(e.target.value)} />
                        <ErrorText show={fieldError === 'jobTitle'} text="Vui lòng nhập Chức vụ" />
                    </Field>

                    <Field id="phone" label="Số điện thoại" error={fieldError === 'phone'}>
                        <input className="input" value={phone} onChange={e => setPhone(e.target.value)} />
                        <ErrorText show={fieldError === 'phone'} text="Vui lòng nhập Số điện thoại" />
                    </Field>

                    <Field label="Email">
                        <input className="input bg-gray-100" disabled value={user?.email ?? ''} />
                    </Field>
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

export default BrandProfile;

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
