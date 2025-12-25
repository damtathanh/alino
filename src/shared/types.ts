export type Role = 'creator' | 'brand';

export type SocialLinks = Partial<{
    tiktok: string;
    instagram: string;
    youtube: string;
    facebook: string;
    website: string;
}>;

export interface Profile {
    id: string;
    email?: string | null;
    email_verified?: boolean | null;
    role?: Role | null;
    full_name?: string | null;
    birth_year?: number | null;
    city?: string | null;

    avatar_url?: string | null;
    phone?: string | null;
    gender?: string | null;
    marketing_opt_in?: boolean | null;

    creator_type?: string | null;
    platforms?: string[] | null;
    goals?: string[] | null;
    content_categories?: string[] | null;
    experience_level?: string | null;
    income_range?: string | null;
    social_links?: SocialLinks | null;

    company_name?: string | null;
    company_domain?: string | null;
    company_type?: string | null;
    job_title?: string | null;
    industry?: string | null;
    team_size_range?: string | null;
    budget_range?: string | null;
    campaigns_per_month?: string | null;

    onboarding_completed?: boolean | null;
    created_at?: string;
    updated_at?: string;
}
