import type { Profile } from '../shared/types';

const hasItems = (arr?: string[] | null) => Array.isArray(arr) && arr.length > 0;

export function isProfileComplete(p: Profile | null): boolean {
    if (!p) return false;
    if (!p.role) return false;
    if (!p.full_name) return false;
    if (!p.city) return false;
    if (p.onboarding_completed !== true) return false;

    if (p.role === 'creator') {
        // required “thật” cho creator

        if (!p.creator_type) return false;
        if (!hasItems(p.platforms)) return false;
        if (!hasItems(p.goals)) return false;
        if (!hasItems(p.content_categories)) return false;
        return true;
    }

    if (p.role === 'brand') {
        // required “thật” cho brand
        if (!p.company_name) return false;
        if (!p.company_domain) return false;
        if (!p.company_type) return false;
        if (!p.job_title) return false;
        if (!hasItems(p.goals)) return false;
        return true;
    }

    return false;
}

export function getMissingFields(p: Profile | null): string[] {
    const missing: string[] = [];
    if (!p) return ['profile'];

    if (!p.role) missing.push('role');
    if (!p.full_name) missing.push('full_name');
    if (!p.city) missing.push('city');
    if (p.onboarding_completed !== true) missing.push('onboarding_completed');

    if (p.role === 'creator') {

        if (!p.creator_type) missing.push('creator_type');
        if (!hasItems(p.platforms)) missing.push('platforms');
        if (!hasItems(p.goals)) missing.push('goals');
        if (!hasItems(p.content_categories)) missing.push('content_categories');
    }

    if (p.role === 'brand') {
        if (!p.company_name) missing.push('company_name');
        if (!p.company_domain) missing.push('company_domain');
        if (!p.company_type) missing.push('company_type');
        if (!p.job_title) missing.push('job_title');
        if (!hasItems(p.goals)) missing.push('goals');
    }

    return missing;
}
