export type Role = 'creator' | 'brand';

export interface Profile {
    id: string;
    email?: string | null;
    role?: Role | null;
    full_name?: string | null;
    birth_year?: number | null;
    city?: string | null;
    creator_type?: string | null;
    platforms?: string[] | null;
    goals?: string[] | null;
    company_name?: string | null;
    company_domain?: string | null;
    company_type?: string | null;
    job_title?: string | null;
    onboarding_completed?: boolean | null;
    created_at?: string;
    updated_at?: string;
}
