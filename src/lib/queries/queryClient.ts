import { QueryClient } from '@tanstack/react-query';

/**
 * React Query Client Configuration
 * 
 * Default settings for all queries:
 * - staleTime: 5 minutes (data considered fresh for 5 min)
 * - cacheTime: 10 minutes (unused data kept in cache for 10 min)
 * - retry: 1 time on failure
 * - refetchOnWindowFocus: false (don't refetch when user returns to tab)
 */
export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5 * 60 * 1000, // 5 minutes
            gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
            retry: 1,
            refetchOnWindowFocus: false,
        },
    },
});
