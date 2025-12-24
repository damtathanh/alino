import { supabase } from './client';
import type { Profile } from '../../shared/types';

export const getProfile = async (userId: string): Promise<Profile | null> => {
    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

    if (error) {
        console.error('Error fetching profile:', error);
        throw error;
    }

    return data;
};

export const upsertProfile = async (profileData: Partial<Profile> & { id: string, email?: string | null }): Promise<Profile> => {
    const { data, error } = await supabase
        .from('profiles')
        .upsert(profileData, { onConflict: 'id' })
        .select('*')
        .single();

    if (error) {
        console.error('Error upserting profile:', error);
        throw error;
    }

    return data;
};

export const updateProfile = async (userId: string, patch: Partial<Profile>): Promise<Profile> => {
    const { data, error } = await supabase
        .from('profiles')
        .update(patch)
        .eq('id', userId)
        .select('*')
        .single();

    if (error) {
        console.error('Error updating profile:', error);
        throw error;
    }

    return data;
};

export const updateMyProfile = async (userId: string, patch: Partial<Profile>): Promise<Profile> => {
    return updateProfile(userId, patch);
};

export const markOnboardingDone = async (userId: string): Promise<Profile> => {
    return updateProfile(userId, { onboarding_completed: true });
};
