const getEnv = (key: string): string => {
    const value = import.meta.env[key];
    if (!value) {
        throw new Error(`Missing environment variable: ${key}`);
    }
    return value;
};

export const ENV = {
    SUPABASE_URL: getEnv('VITE_SUPABASE_URL'),
    SUPABASE_ANON_KEY: getEnv('VITE_SUPABASE_ANON_KEY'),
} as const;
