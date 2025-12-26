/**
 * Skeleton Loading Components
 * 
 * Simple loading placeholders for better UX during data fetching.
 */

interface SkeletonProps {
    className?: string;
}

/**
 * Base Skeleton component
 */
export const Skeleton = ({ className = '' }: SkeletonProps) => {
    return (
        <div
            className={`animate-pulse bg-gray-200 rounded ${className}`}
            aria-label="Loading..."
        />
    );
};

/**
 * Skeleton for text lines
 */
export const SkeletonText = ({ lines = 1 }: { lines?: number }) => {
    return (
        <div className="space-y-2">
            {Array.from({ length: lines }).map((_, i) => (
                <Skeleton
                    key={i}
                    className={`h-4 ${i === lines - 1 ? 'w-3/4' : 'w-full'}`}
                />
            ))}
        </div>
    );
};

/**
 * Skeleton for circular avatar
 */
export const SkeletonAvatar = ({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) => {
    const sizeClasses = {
        sm: 'w-8 h-8',
        md: 'w-16 h-16',
        lg: 'w-24 h-24',
    };

    return <Skeleton className={`${sizeClasses[size]} rounded-full`} />;
};

/**
 * Skeleton for cards
 */
export const SkeletonCard = () => {
    return (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
            <Skeleton className="h-6 w-1/3" />
            <SkeletonText lines={3} />
        </div>
    );
};

/**
 * Skeleton for profile page
 */
export const SkeletonProfile = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-10">
            <div className="max-w-4xl mx-auto px-4 space-y-8">
                {/* Header */}
                <div className="flex items-center gap-6">
                    <SkeletonAvatar size="lg" />
                    <div className="flex-1 space-y-2">
                        <Skeleton className="h-8 w-48" />
                        <Skeleton className="h-4 w-32" />
                    </div>
                </div>

                {/* Cards */}
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
            </div>
        </div>
    );
};
