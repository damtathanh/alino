import type { Profile } from '../shared/types';

const hasItems = (arr?: string[] | null) => Array.isArray(arr) && arr.length > 0;

export function isProfileComplete(p: Profile | null): boolean {
    if (!p) return false;
    if (!p.role) return false;
    if (!p.full_name) return false;
    if (!p.city) return false;

    if (p.role === 'creator') {
        return !!p.birth_year && !!p.creator_type && hasItems(p.platforms) && hasItems(p.goals) && p.onboarding_completed === true;
    }

    if (p.role === 'brand') {
        return !!p.company_name && !!p.company_domain && !!p.company_type && !!p.job_title && hasItems(p.goals) && p.onboarding_completed === true;
    }

    return false;
}

export function getMissingFields(p: Profile | null): string[] {
    const missing: string[] = [];
    if (!p) return ['profile'];

    if (!p.role) missing.push('role');
    if (!p.full_name) missing.push('full_name');
    if (!p.city) missing.push('city');

    if (p.role === 'creator') {
        if (!p.birth_year) missing.push('birth_year');
        if (!p.creator_type) missing.push('creator_type');
        if (!hasItems(p.platforms)) missing.push('platforms');
        if (!hasItems(p.goals)) missing.push('goals');
    }

    if (p.role === 'brand') {
        if (!p.company_name) missing.push('company_name');
        if (!p.company_domain) missing.push('company_domain');
        if (!p.company_type) missing.push('company_type');
        if (!p.job_title) missing.push('job_title');
        if (!hasItems(p.goals)) missing.push('goals');
    }

    if (p.onboarding_completed !== true) missing.push('onboarding_completed');
    return missing;
}
