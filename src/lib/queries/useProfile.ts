import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getProfile, updateProfile } from '../supabase/profile';
import type { Profile } from '@/shared/types';

/**
 * Query key for profile data
 * Format: ['profile', userId]
 */
export const profileKeys = {
    all: ['profile'] as const,
    detail: (userId: string) => [...profileKeys.all, userId] as const,
};

/**
 * Hook to fetch user profile
 * 
 * @param userId - User ID to fetch profile for
 * @returns Query result with profile data, loading state, and error
 */
export function useProfile(userId: string | undefined) {
    return useQuery({
        queryKey: profileKeys.detail(userId || ''),
        queryFn: () => {
            if (!userId) {
                throw new Error('User ID is required');
            }
            return getProfile(userId);
        },
        enabled: !!userId, // Only fetch if userId exists
    });
}

/**
 * Hook to update user profile
 * 
 * Automatically invalidates and refetches profile data on success
 * 
 * @param userId - User ID to update
 * @returns Mutation object with mutate function and states
 */
export function useUpdateProfile(userId: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: Partial<Profile>) => updateProfile(userId, data),
        onSuccess: (updatedProfile) => {
            // Update cache with new data
            queryClient.setQueryData(profileKeys.detail(userId), updatedProfile);
            
            // Alternative: Invalidate to trigger refetch
            // queryClient.invalidateQueries({ queryKey: profileKeys.detail(userId) });
        },
    });
}
